const getCodeBtn = document.querySelector(".get-code-btn");

getCodeBtn.addEventListener("click", function () {
        getCodeBtn.classList.add("disabled");
        var countDownDate = new Date(new Date().getTime()  + 1000 * 30);
        var x = setInterval(function() {
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
        getCodeBtn.innerHTML = seconds + "s";
            
        if (distance < 0) {
            clearInterval(x);
            getCodeBtn.innerHTML = "Lấy mã";
            getCodeBtn.classList.remove("disabled");
        }
        }, 1000);
})