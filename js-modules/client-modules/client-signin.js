const form = document.getElementById('credentialsform');

const userError = document.getElementById('user-error');
const passError = document.getElementById('pass-error');

const emailInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

const request = new XMLHttpRequest();


const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/



form.addEventListener('submit', (event) => {
    event.preventDefault()

    emailInput.style.borderColor = "#FFF"
    passwordInput.style.borderColor = "#FFF"
    userError.innerHTML = ""
    passError.innerHTML = ""

    const emailValid = validateEmail(emailInput.value.trim())
    const passwordValid = validatePassword(passwordInput.value.trim())

    // console.log(emailValid, passwordValid)

    if (emailValid == 1 && passwordValid == 1) {

        const creds = {
            username:emailInput.value.trim(),
            password:passwordInput.value.trim()
        }

        //send response for credentials
        // fetch({
        //     url: "/credentials",
        //     method: "POST",
        //     body: JSON.stringify(creds)
        // })
        // .then(result => console.log(result.body))
        // .catch(error => console.error(error))

        
        request.open("post", "/credentials")
        request.setRequestHeader("Content-Type", "application/json")
        request.send(JSON.stringify(creds))
        request.onload = function () {
            if(request.status == 202 && this.responseText != "") {
            console.log(this.responseText)
            location.assign("/user/"+ JSON.parse(this.responseText).userId)
            } else if (request.status = 401) {
                
            }
        }
    }
    else {
        if(emailValid != 1) {
            userError.innerHTML = emailValid
            emailInput.style.borderColor = "#FF0000"
        }
        if(passwordValid !=1 ){
            passError.innerHTML = passwordValid
            passwordInput.style.borderColor = "#FF0000"
        }
    }

})

/*
* functions
*/

function validateEmail(textToCheck) {

    if (textToCheck == "") {
        return "Please Enter an Email Address";
    }
    if (!emailRegex.test(textToCheck)) {
        return "Please Enter a Valid Email Address";
    }

    return 1;

}

function validatePassword(passwordToValidate) {
    if (passwordToValidate == "") {
        return "Please Enter a Password";
    }
    return 1;
}