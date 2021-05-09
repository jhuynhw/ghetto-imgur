var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/routeprotectors').userIsLoggedIn;
var getRecentPosts = require('../middleware/postsmiddleware').getRecentPosts;
const db = require('../config/database');

/* GET home page. */
// / --> localhost:3000
router.get('/', getRecentPosts, function (req, res, next) {
  // test error page
  // next(new Error('test'));
  res.render('index', { title: "Home Page", javascript: true });
});

router.get('/login', (req, res, next) => {
  res.render("login", { title: "Login Form" });
});

router.get('/registration', (req, res, next) => {
  res.render("registration", { title: "Registration Account", javascript: true });
});

router.get('/postimage', isLoggedIn, (req, res, next) => {
  res.render("postimage", { title: "Post Image" });
});

router.get("/post/:id(\\d+)", (req, res, next) => {
  let baseSQL = "SELECT u.username, p.title, p.description, p.photopath, p.created \
  FROM users u \
  JOIN posts p \
  ON u.id=fk_userid \
  WHERE p.id=?;";

  let postId = req.params.id;

  db.execute(baseSQL, [postId])
    .then(([results, fields]) => {
      if (results && results.length) {
        let post = results[0];
        res.render('imagepost', { currentPost: post });
      }
      else {
        req.flash('error', "This is not the post you are looking for!");
        req.redirect('/');
      }
    })
});

// router.get('/imagepost', (req, res, next) => {
//   res.render("imagepost", {title: "View Post"});
// });

module.exports = router;
