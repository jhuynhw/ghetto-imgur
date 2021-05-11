const db = require('../config/database');
const bcrypt = require("bcrypt");
const UserModel = {}

UserModel.create = async (username, password, email) => {
    password = bcrypt.hash(password, 15)
    try {
        if(!(await UserModel.usernameExists(username)) || !(await UserModel.emailExists(email))){
            let base = "INERT INTO user (`username`, `name`, `email`, `password`, `created`) VALUES (?, ?, ?, ?, ?, now());"
            return await db.execute(base, [username, username, email, password])
        }
    } catch(err) {
        return null
    }
}

// not sure if im refactoring right here
UserModel.usernameExists = async username => {
    try { 
        let [r, f] = await db.execute("SELECT id FROM users WHERE username=?", [username])
        return r && r.length
    }
    catch(err) {
        return false; 
    }
}

UserModel.emailExists = async email => {
    try{
        let [r, f] = await db.query("SELECT id FROM users WHERE email=?", [email])
        return r && r.length
    }
    catch(err) {
        return false
    }
}

UserModel.authenticate = async (username, password) => {
    /*
    router.get("login", async (req, res) => {
        let {username, password} = req.body;

        let userid = await UserModel.authenticate(username, password)

        if(userid) {
            req.session.username = username;
            req.session.userId = userid;
            res.locals.logged = true;
            res.redirect("/")
        }
        else {
            res.redirect("/login")
        }

    })
    */
    try {
        let base = "SELECT id, username, password FROM users WHERE username=?;";
        console.log(`Username in authenticate: ${username}`)
        let [r, f] = await db.execute(base, [username])
        if(r && r.length){
            let check = await bcrypt.compare(password, r[0].password)
            console.log(`Status: User ${username} Exists, Checking password`)
            return check ? r[0].id : null
        } else{
            console.log("Status: User Doesnt Exist")
            return null
        }
    }
    catch {
        console.log("Status: Server Error")
        return null
    }
}

module.exports = UserModel;