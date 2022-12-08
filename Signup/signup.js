
const formElement = document.querySelector(".signup-form");
const emailInput = formElement.querySelector(".email-input");
const passwordInput = formElement.querySelector(".password-input");
const modalContent = document.querySelector(".message .modal-content");
const modalMessageBtn = document.querySelector(".modal-message-btn");
const modalMessage = modalContent.querySelector(".message .modal-body");
const modalFooter = modalContent.querySelector(".message .modal-footer");

var newUser = {
    username: "",
    password: ""
};

formElement.onsubmit = function () {
    if (formElement.checkValidity()) {
        var emailInputValue = emailInput.value;
        var passwordInputValue = passwordInput.value;
        newUser.username = emailInputValue;
        newUser.password = passwordInputValue;
        var users = Array.from(JSON.parse(localStorage.getItem("users"))).concat(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        modalMessage.innerHTML = `<p>Đăng ký thành công</p>`;
        modalMessage.style.background = "rgba(209, 231, 221, 0.9)";
        modalFooter.style.background = "rgba(209, 231, 221, 0.9)";
        modalMessageBtn.click();
        setTimeout(function () {
            formElement.submit();
            window.location.assign("../Login/login.html");
        }, 1500);
    }
}

