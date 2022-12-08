var isLogin = localStorage.getItem("isLogin");

const profileForm = document.querySelector("main form");
const email = document.querySelector("#email");
const fullname = document.querySelector("#name");
const phone = document.querySelector("#phone");
const address = document.querySelector("#address");
const modalContent = document.querySelector(".message .modal-content");
const modalMessageBtn = document.querySelector(".modal-message-btn");
const modalMessage = modalContent.querySelector(".message .modal-body");
const modalFooter = modalContent.querySelector(".message .modal-footer");
const updateProfileBtn = document.querySelector(".update-profile-btn");
const logoutBtn = document.querySelector(".logout-btn");

var accountUpdated = {
    fullname: "",
    phone: "",
    address: ""
}

if (isLogin == "true") {
    var currentAccount = localStorage.getItem("currentAccount");
    console.log(currentAccount);
    email.innerText = currentAccount;

    fullname.value = JSON.parse(localStorage.getItem(currentAccount)).fullname;
    phone.value = JSON.parse(localStorage.getItem(currentAccount)).phone;
    address.value = JSON.parse(localStorage.getItem(currentAccount)).address;


    updateProfileBtn.addEventListener("click", function (e) {
        e.preventDefault();
        accountUpdated.fullname = fullname.value;
        accountUpdated.phone = phone.value;
        accountUpdated.address = address.value;
        localStorage.setItem(currentAccount, JSON.stringify(accountUpdated));
        modalMessage.innerHTML = `<p>Cập nhật thông tin thành công</p>`;
        modalMessage.style.background = "rgba(209, 231, 221, 0.9)";
        modalFooter.style.background = "rgba(209, 231, 221, 0.9)";
        modalMessageBtn.click();
        setTimeout(function () {
            profileForm.submit();
        }, 1000);
    });

}

logoutBtn.addEventListener("click", function () {
    localStorage.setItem("isLogin", false);
    window.location.assign("../index.html");
})



