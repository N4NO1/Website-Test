const form = document.getElementById('registration-form');

//error fields
const userError = document.getElementById('user-error');
const passError = document.getElementById('pass-error');
const passConfirmError = document.getElementById('pass-confirm-error')
const formError = document.getElementById('form-error');
const formErrorDiv = document.getElementById('form-error-div');


//inputs
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const passwordConfirmInput = document.getElementById('password-confirm');

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

form.addEventListener('submit', async (event) => {
    event.preventDefault()

    emailInput.style.borderColor = "#FFF"
    passwordInput.style.borderColor = "#FFF"
    passwordConfirmInput.style.borderColor = '#FFF'
    userError.innerHTML = ""
    passError.innerHTML = ""
    passConfirmError.innerHTML = ""

    const emailValid = validateEmail(emailInput.value.trim())
    const passwordValid = validatePassword(passwordInput.value.trim(), passwordConfirmInput.value.trim())

    
    if (emailValid == 1 && passwordValid == 1) {

        const details = {
            email: emailInput.value.trim(),
            password: passwordInput.value.trim()
        }

        const registerResponse = await fetch("/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(details)
        })

        if (registerResponse.status == 201 && registerResponse.body !="") {
            location.assign(`/register-success?${JSON.parse(registerResponse.body).email}`)
        }
        else {
            formErrorDiv.style.backgroundColor = "#FF0000"
            formError.style.color = "FFFFFF"
            formError.innerHTML = JSON.parse(registerResponse.body).error ?? "Error while creating user."
        }

    }
    else {
        if(emailValid != 1) {
            userError.innerHTML = emailValid
            emailInput.style.borderColor = "#FF0000"
            console.error(emailValid)
        }
        if(passwordValid !=1 ){
            passError.innerHTML = passwordValid === "Please Confirm the Password" ? "" : passwordValid
            passConfirmError.innerHTML = passwordValid
            passwordInput.style.borderColor = passwordValid === "Please Confirm the Password" ? "#FFF" : "#F00"
            passwordConfirmInput.style.borderColor = "#FF0000"
            console.error(passwordValid)
        }
    }


})

function validateEmail(textToCheck) {

    if (textToCheck == "") {
        return "Please Enter an Email Address";
    }
    if (!emailRegex.test(textToCheck)) {
        return "Please Enter a Valid Email Address";
    }

    return 1;

}

function validatePassword(passwordToValidate, passwordConfirm) {
    if (passwordToValidate == "" && passwordConfirm == "") {
        return "Please Enter a Password";
    }
    else if (passwordToValidate != "" && passwordConfirm == "") {
        return "Please Confirm the Password";
    }
    else if(passwordToValidate != passwordConfirm) {
        return "Passwords Do Not Match";
    }
    return 1;
} 