var listAccount = [
    {
        username: "admin1@gmail.com",
        password: "13062013"
    },
    {
        username: "admin2@gmail.com",
        password: "serendipity"
    },
    {
        username: "admin3@gmail.com",
        password: "singularity"
    }
]

var isLogin = localStorage.getItem("isLogin");

const loginForm = document.querySelector(".login-form");
const emailInput = loginForm.querySelector(".email-input");
const passwordInput = loginForm.querySelector(".password-input");
const modalContent = document.querySelector(".message .modal-content");
const modalMessageBtn = document.querySelector(".modal-message-btn");
const modalMessage = modalContent.querySelector(".message .modal-body");
const modalFooter = modalContent.querySelector(".message .modal-footer");

loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var email = emailInput.value;
    var password = passwordInput.value;
    var isSuccess = false;

    for (let i = 0; i < listAccount.length; i++) {
        if (email.localeCompare(listAccount[i].username) == 0
            && password.localeCompare(listAccount[i].password) == 0) {
            isSuccess = true;
            localStorage.setItem("currentAccount", email);
        }
    }
    if (loginForm.checkValidity()) {
        if (isSuccess) {
            modalMessage.innerHTML = `<p>Đăng nhập thành công</p>`;
            modalMessage.style.background = "rgba(209, 231, 221, 0.9)";
            modalFooter.style.background = "rgba(209, 231, 221, 0.9)";
            modalMessageBtn.click();
            localStorage.setItem("isLogin", true);
            setTimeout(function () {
                loginForm.submit();
                window.location.assign("../index.html");
            }, 1500);
        }
        else {
            modalMessage.innerHTML = `<p>Địa chỉ email hoặc mật khẩu không đúng</p>`
            modalMessage.style.background = "rgba(255, 155, 155, 0.8)";
            modalFooter.style.background = "rgba(255, 155, 155, 0.8)";
            localStorage.setItem("isLogin", false);
            modalMessageBtn.click();
        }
    }

})
