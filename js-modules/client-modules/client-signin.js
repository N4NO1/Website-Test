const form = document.getElementById('credentialsform');

const userError = document.getElementById('user-error');
const passError = document.getElementById('pass-error');
const formError = document.getElementById('form-error');
const formErrorDiv = document.getElementById('form-error-div');

const emailInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const params = new URLSearchParams(window.location.search)

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

function loaded() {
    emailInput.value = params.get("email")
}

form.addEventListener('submit', async (event) => {
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

        const credResponse = await fetch("/credentials", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(creds)
        })

        if (credResponse.status == 202 && credResponse.body !="") {
            location.assign(`/user-home/${(await credResponse.json()).userId}`)
        }
        else if (credResponse.status == 401) {
            formErrorDiv.style.backgroundColor = "#FF0000"
            formError.style.color = "FFFFFF"
            formError.innerHTML = "Username and Password did not match"
        } 
        else if(credResponse.status == 404) {
            formErrorDiv.style.backgroundColor = "#FF0000"
            formError.style.color = "FFFFFF"
            formError.innerHTML = "Username does not exist"
        }
        else {
            formErrorDiv.style.backgroundColor = "#FF0000"
            formError.style.color = "FFFFFF"
            formError.innerHTML = credResponse.body
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