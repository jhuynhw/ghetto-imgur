var express = require('express');
var router = express.Router();
const db = require('../config/database');
const { errorPrint, successPrint } = require('../helpers/debug/debugprinters');
var sharp = require('sharp');
var multer = require('multer');
var crypto = require('crypto');
var PostError = require('../helpers/error/PostError');
const { random } = require('colors');
const Engine = require("../helpers/validation/validation");
var PostError = require("../helpers/error/PostError");
const PostModel = require('../models/Posts');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/uploads");
    },
    filename: function (req, file, cb) {
        let fileExt = file.mimetype.split('/')[1];
        let randomName = crypto.randomBytes(22).toString("hex");
        cb(null, `${randomName}.${fileExt}`);
    }
});

var uploader = multer({ storage: storage });

router.post('/createPost', uploader.single("uploadImage"), async (req, res, next) => {
    let fileUploaded = req.file.path;
    let fileAsThumbnail = `thumbnail-${req.file.filename}`;
    let destinationOfThumbnail = req.file.destination + "/" + fileAsThumbnail;
    let title = req.body.title;
    let description = req.body.description;
    let fk_userId = req.session.userId;
    // console.log("title")
    // console.log(Engine.normalChars(title))
    // console.log("desc")
    // console.log(Engine.normalChars(description))
    if (!Engine.normalChars(title) || !Engine.normalChars(description)) {
        res.redirect("/postimage")
    }
    else {
        sharp(fileUploaded)
            .resize(200)
            .toFile(destinationOfThumbnail)
            .then(() => {
                return PostModel.create(title, description, fileUploaded, destinationOfThumbnail, fk_userId);
                // let baseSQL = 'INSERT INTO posts (title, description, photopath, thumbnail, created, fk_userid) VALUE (?, ?, ?, ?, now(), ?);;';
                // return db.execute(baseSQL, [title, description, fileUploaded, destinationOfThumbnail, fk_userId])
            })
            // .then(([results, fields]) => {
            .then((postWasCreated) => {
                // if (results && results.affectedRows) {
                if (postWasCreated) {
                    req.flash('success', "Your post was created successfully!");
                    // can route to individual post later
                    res.redirect('/');
                }
                else {
                    throw new PostError('Post could not be created!', '/postimage', 200);
                }
            })
            .catch((err) => {
                if (err instanceof PostError) {
                    errorPrint(err.getMessage());
                    req.flash('error', err.getMessage());
                    res.status(err.getStatus());
                    res.redirect(err.getRedirectURL());
                }
                else {
                    next(err);
                }
            })
    }
});

// localhost:3000/posts/search?search=value
// router.get('/search', (req, res, next) => {
//     let searchTerm = req.query.search;
//     if (!searchTerm) {
//         res.send({
//             resultsStatus: "info",
//             message: "No search term given",
//             results: []
//         });
//     }
//     else {
//         let baseSQL = "SELECT id, title, description, thumbnail, concat_ws(' ', title, description) AS haystack \
//         FROM posts \
//         HAVING haystack like ?;"
//         let sqlReadySearchTerm = "%" + searchTerm + "%";
//         db.execute(baseSQL, [sqlReadySearchTerm])
//             .then(([results, fields]) => {
//                 if (results && results.length) {
//                     res.send({
//                         resultsStatus: "info",
//                         message: `${results.length} results founds`,
//                         results: results
//                     })
//                 }
//                 else {
//                     db.query('SELECT id, title, description, \
//                      thumbnail, created FROM posts ORDER BY created DESC LIMIT 8', [])
//                         .then(([results, fields]) => {
//                             res.send({
//                                 resultsStatus: "info",
//                                 message: "No results were found for your search but here are the 8 most recent posts",
//                                 results: results
//                             })
//                         })
//                 }
//             })
//             .catch((err) => next(err))
//     }
// });

router.get('/search', async (req, res, next) => {
    try {
        let searchTerm = req.query.search;
        if (!searchTerm) {
            res.send({
                // resultsStatus: "info",
                message: "No search term given",
                results: []
            });
        }
        else {
            let results = await PostModel.search (searchTerm);
        //     let baseSQL = "SELECT id, title, description, thumbnail, concat_ws(' ', title, description) AS haystack \
        // FROM posts \
        // HAVING haystack like ?;"
        //     let sqlReadySearchTerm = "%" + searchTerm + "%";
        //     let [results, fields] = await db.execute(baseSQL, [sqlReadySearchTerm]);
            if (results && results.length) {
                res.send({
                    // resultsStatus: "info",
                    message: `${results.length} results founds`,
                    results: results
                })
            }
            else {
                let results = await PostModel.getNRecentPosts(8);
                res.send({
                // let [results, fields] = await db.query('SELECT id, title, description, \
                // thumbnail, created FROM posts ORDER BY created DESC LIMIT 8', []);
                // res.send({
                    // resultsStatus: "info",
                    message: "No results were found for your search but here are the 8 most recent posts",
                    results: results
                })
            }
        }
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;