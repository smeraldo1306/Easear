

const formElement = document.querySelector(".signup-form");
const emailInput =  formElement.querySelector(".email-input");
const passwordInput = formElement.querySelector(".password-input");

var newUser = {
    username: "",
    password: ""
};

formElement.onsubmit = function() {
    if(formElement.checkValidity()) {
        var emailInputValue = emailInput.value;
        var passwordInputValue = passwordInput.value;
        newUser.username = emailInputValue;
        newUser.password = passwordInputValue;
        var users = Array.from(JSON.parse(localStorage.getItem("users"))).concat(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        formElement.submit();
    }
}

