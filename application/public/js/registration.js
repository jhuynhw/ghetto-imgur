const form = document.getElementById("submitform")
const username = document.getElementById("registration_username")
const password = document.getElementById("registration_pass")
const confirmpassword = document.getElementById("registration_confirmpass")
const email = document.getElementById("email")

form.addEventListener("submit", e =>{
    let messages = []
    e.preventDefault()
    let readyToSubmit = true;
    
    // regex for username criteria
    let user1regex = /^[A-Za-z]/;
    let user2regex = /.*[a-zA-Z0-9]{3}/;

    // regex for password criteria
    let upperCheck = /[A-Z]/;
    let numCheck = /[0-9]/;
    let specialCheck = /[/*-+!@#$^&*]/;

    // regex for email
    //let mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    // 1. username begins w/ char a-z A-Z
    if (username.value && !username.value[0].match(user1regex)) {
        messages.push("❌ Username must begin with a character\n")
        readyToSubmit = false;
    }

    else {
        messages.push("✔️ Username must begin with a character\n")
    }

    // 2. alphanumeric char username
    if (!username.value.match(user2regex)) {
        messages.push("❌ Username must be 3 or more alphanumeric characters\n")
        readyToSubmit = false;
    }

    else {
        messages.push("✔️ Username must be 3 or more alphanumeric characters\n")
    }

    // 3. password criteria
    if(password.value.length < 8) {
        messages.push("❌ Password must be 8 or more characters long\n")
        readyToSubmit = false;
    }
    
    else {
        messages.push("✔️ Password must be 8 or more characters long\n")
    }

    if (!password.value.match(upperCheck)) {
        messages.push("❌ Password must have an upper case letter\n")
        readyToSubmit = false;
    }
    
    else {
        messages.push("✔️ Password must have an upper case letter\n")
    }

    if (!password.value.match(numCheck)) {
        messages.push("❌ Password must have an upper case letter\n")
        readyToSubmit = false;
    }
    
    else {
        messages.push("✔️ Password must have an upper case letter\n")
    }

    if (!password.value.match(specialCheck)) {
        messages.push("❌ Password must have 1 of the following special characters: ( / * - + ! @# $ ^ & * )\n")
        readyToSubmit = false;
    }
    
    else {
        messages.push("✔️ Password must have 1 of the following special characters: ( / * - + ! @# $ ^ & * )\n")
    }

    // confirm password is same as password
    if (password.value != confirmpassword.value) {
        messages.push("❌ Passwords does not match!\n")
        readyToSubmit = false;
    }
    
    else {
        messages.push("✔️ Passwords does not match!\n")
    }

    // age and TOS/Privacy checked (NOT NECESSARY B/C OF "require" ATTRIBUTE)
    if (!this.submitform.ofage.checked) {
        messages.push('❌ You must be over 13 years of age.\n');
        readyToSubmit = false;
    }
    
    else {
        messages.push('✔️ You must be over 13 years of age.\n');
    }

    if (!this.submitform.readtos.checked) {
        messages.push('❌ You must confirm that you have read the TOS and Privacy\n');
        readyToSubmit = false;
    }
    
    else {
        messages.push('✔️ You must confirm that you have read the TOS and Privacy\n');
    }

    if(messages.length) {
        if (readyToSubmit == false) {
            e.preventDefault()
            console.log("Errors")
            alert(messages.join(""));
        }

        else {
            e.preventDefault()
            alert("🎉 The form was submitted! 🎉");
            location.reload();
        }
    }
})