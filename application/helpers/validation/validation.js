const Engine = {}

/*
    Functions only return true or false
*/

// regex for username criteria
let user1regex = /^[A-Za-z]/; // char from a-z
let user2regex = /.*[a-zA-Z0-9]{3}/; // must be >=3 alphanumeric char
let mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
let normalChars = /[a-zA-Z0-9\s]/;

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

Engine.normalChars = (text) => {
    if(!text || !text.length) return false
    return text.match(normalChars)
}

module.exports = Engine;
