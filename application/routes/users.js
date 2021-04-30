const express = require('express');
const router = express.Router();
const db = require('../config/database');

/* GET users listing. */
// localhost:3000/users
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', async (req, res, next) => {
  let {username, email, password, confirmpassword} = req.body;

  /**
   * 
   * do server side
   * validation here
   * 
   */

  if(/*!validUser(username) || !validEmail(email) || */ password != confirmpassword) res.redirect("/registration")

  try{
    let base = "INSERT INTO users (`username`, `email`, `password`, `created`) VALUES (?, ?, ?, now());"
    
    // souza way
    // db.query(base, [username, email, password])
    // .then(response =>{
      //   if(!(r && r.length)){
        //   console.log("success")
        //   res.redirect("/login")
        //     console.log("failed")
        //     res.redirect("/registration")
        //   }
        //   }else{
          // }).catch(err){
            //   console.log("error caught")
            //   console.log(err)
            //   res.redirect("/")
            // }

    // my way
    let [r, f] = await db.query(base, [username, email, password]);
    if(!(r && r.length)){
      console.log("success")
      res.redirect("/login")
    }
    else{
      console.log("failed")
      res.redirect("/registration")
    }
  }catch(err){
    console.log("error caught")
    console.log(err)
    res.redirect("/")
  }
})

router.post('/login', async (req, res, next) => {
  let {username, password} = req.body
  try{
  // will this work
  // let base = "SELECT * FROM users WHERE username=?;";
  let base = "SELECT id,username, password FROM users WHERE username=?;";
  let [r, f] = await db.query(base, [username]);

  if (r && r.length) {
    if(r[0].password === password){
      console.log(`User ${username} has been logged in!`)
      res.redirect("/")
    }
    else{
      console.log(`Error: Login for user ${username} failed!`)
      res.redirect("/login")
    }
  }else{
    console.log("Error: User doesnt exist")
    res.redirect("/login")
  }
  }catch(err){
    console.log(`Error: ${err}`)
    res.redirect("/login")
  }

})

module.exports = router;
