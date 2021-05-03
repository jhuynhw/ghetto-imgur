var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/routeprotectors').userIsLoggedIn;

/* GET home page. */
// / --> localhost:3000
router.get('/', function(req, res, next) {
  // test error page
  // next(new Error('test'));
  res.render('index', {title: "Home Page", javascript: true});
});

router.get('/login', (req, res, next) => {
  res.render("login", {title: "Login Form"});
});

router.get('/registration', (req, res, next) => {
  res.render("registration", {title: "Registration Account", javascript: true});
});

router.get('/postimage', isLoggedIn, (req, res, next) => {
  res.render("postimage", {title: "Post Image"});
});

// router.get('/imagepost', (req, res, next) => {
//   res.render("imagepost", {title: "View Post"});
// });

module.exports = router;
