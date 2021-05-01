const Engine = {}

/*
    Functions only return true or false
*/

// regex for username criteria
let user1regex = /^[A-Za-z]/;
let user2regex = /.*[a-zA-Z0-9]{3}/;
let mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

Engine.validUsername = async (username) =>{
    if(username.value && !username.value[0].match(user1regex) && !username.value.match(user2regex)) {
        return false
    }
    return true
}


Engine.validEmail = async (email) =>{
    if(mailFormat) {
        return false
    }
    return true
}

module.exports = Engine;