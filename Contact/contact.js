const contactForm = document.querySelector(".contact-form");
const modalContent = document.querySelector(".message .modal-content");
const modalMessageBtn = document.querySelector(".modal-message-btn");
const modalMessage = modalContent.querySelector(".message .modal-body");
const modalFooter = modalContent.querySelector(".message .modal-footer");

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if(contactForm.checkValidity()) {
        modalMessage.innerHTML = `<p>Gửi phản hồi thành công</p>`;
        modalMessage.style.background = "rgba(209, 231, 221, 0.9)";
        modalFooter.style.background = "rgba(209, 231, 221, 0.9)";
        modalMessageBtn.click();
        setTimeout(function() {
            contactForm.submit();
            window.location.assign("/index.html");
        }, 1500); 
    }
})