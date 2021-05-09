const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Engine = require("../helpers/validation/validation");
const bcrypt = require('bcrypt');
const { errorPrint, successPrint } = require('../helpers/debug/debugprinters');

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/register', async (req, res, next) => {
  let { username, email, password, confirmpassword } = req.body;

  if (!Engine.validUsername(username) || !Engine.validEmail(email) || password != confirmpassword) res.redirect("/registration")

  try {
    let base = "INSERT INTO users (`username`, `email`, `password`, `created`) VALUES (?, ?, ?, now());"
    // encrypts password
    password = await bcrypt.hash(password, 15);

    // checks if there are duplicates
    let checkUser = "SELECT id FROM users WHERE username=?"
    let checkEmail = "SELECT id FROM users WHERE email=?"
    let [r1, f1] = await db.query(checkUser, [username])
    let [r2, f2] = await db.query(checkEmail, [email])

    if (r1 && r1.length) {
      console.log(`Error: Username already exists`)
      req.flash(`error`, `Username already exists`)
      await res.render("registration", { title: "Register Account" })
    }

    else if (r2 && r2.length) {
      console.log(`Error: Email already exists`)
      req.flash(`error`, `Email already exists`)
      await res.render("registration", { title: "Register Account" })
    }

    // searches mySQL for account details
    else {
      let [r, f] = await db.query(base, [username, email, password]);

      if (!(r && r.length)) {
        console.log("success")
        req.flash('success', 'User account has been made')
        res.redirect("/login")
      }

      else {
        console.log("failed")
        res.redirect("/registration")
      }
    }
  }
  catch (err) {
    console.log("error caught")
    console.log(err)
    req.flash('error', err.getMessage())
    res.redirect("/")
  }
})

router.post('/login', async (req, res, next) => {
  let { username, password } = req.body
  try {
    // will this work
    // let base = "SELECT * FROM users WHERE username=?;";
    let base = "SELECT id, username, password FROM users WHERE username=?;";
    let userId;
    let [r, f] = await db.query(base, [username]);

    if (r && r.length) {
      userId = r[0].id;
      if (await bcrypt.compare(password, r[0].password)) {
        console.log(`User ${username} has been logged in!`)
        // initialize users session
        req.session.username = username;
        // adds userId to the session
        req.session.userId = userId;
        res.locals.logged = true;
        req.flash('success', 'You have been successfully logged in!');
        res.redirect("/")
      }
      else {
        console.log(`Error: Login for user ${username} failed!`)
        req.flash('error', `Login for user ${username} failed!`);
        res.render("login", { title: "Login Form" })
      }
    }
    else {
      console.log("Error: User doesnt exist")
      req.flash('error', 'User doesnt exist');
      res.render("login", { title: "Login Form" })
    }
  }
  catch (err) {
    console.log(`Error: ${err}`)
    req.flash('error', err.getMessage())
    res.render("login", { title: "Login Form" })
  }

})

router.post('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      errorPrint('session could not be destroyed');
      next(err);
    }

    else {
      successPrint('session was destroyed');
      res.clearCookie('csid');
      res.json({ status: "OK", messsage: "user is logged out" });
    }
  })
})

module.exports = router;