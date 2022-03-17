const form = document.getElementById('credentialsform');

const userError = document.getElementById('user-error');
const passError = document.getElementById('pass-error');

const emailInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

const request = new XMLHttpRequest();


const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



form.addEventListener('submit', (event) => {

    event.preventDefault();
    const emailValid = validateEmail(emailInput.value.trim())
    const passwordValid = validatePassword(passwordInput.value.trim())

    // console.log(emailValid, passwordValid)

    if (emailValid == 1 && passwordValid == 1) {

        const creds = {
            username:emailInput.value.trim(),
            password:passwordInput.value.trim()
        }

        //send response for credentials

        request.open("post", "/credentials")
        request.send(JSON.stringify(creds))
        request.onload = function () {
            if(request.status == 202 && this.responeText != "") {
            console.log(this.responseText)
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