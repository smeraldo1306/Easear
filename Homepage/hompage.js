var isLogin = localStorage.getItem("isLogin");
const user = document.querySelector(".user");
const userLgScreen = document.querySelector(".user-lg-screen");
const dropdownBtn = user.querySelector(".dropdown-toggle");
const loginItem = document.querySelector(".navbar .login");
const signUpItem = document.querySelector(".navbar .signup");
const moveToProfilePage = document.querySelectorAll(".profile-detail");
const switchAccountBtn = document.querySelectorAll(".switch-account");
const logOutBtn = document.querySelectorAll(".log-out");
const usernames = document.querySelectorAll(".username");
const headerSearchBtn = document.querySelector(".header-search-btn");
const formSearch = document.querySelector("header .form-search");

if(headerSearchBtn) {
    headerSearchBtn.addEventListener("click", function () {
        formSearch.classList.toggle("show-search-input");
    })
}

if(usernames) {
    for(i of usernames) {
        var currentAccount = localStorage.getItem("currentAccount");
        if(localStorage.getItem("currentAccount") != null) {
            var currentAccountName = JSON.parse(localStorage.getItem(currentAccount)).fullname;
            if(currentAccountName == "") {
                i.innerText = "Bạn chưa đặt tên";
            } else {
                i.innerText = currentAccountName;
            }
        }
    }       
}

if(signUpItem) {
    signUpItem.addEventListener("click", function () {
        localStorage.setItem("users", "[]");
    })
}

if(isLogin == "true") {
    user.style = "display: block;";
    loginItem.style = "display: none;";
    signUpItem.style = "display: none;";
} else {
    user.style = "display: none;"
    userLgScreen.style.display = "none";
}

if(dropdownBtn) {
    dropdownBtn.addEventListener("click", function () {
        dropdownBtn.classList.toggle("rotate");
    })
}

// localStorage.setItem("isLogin", false);
if(moveToProfilePage) {
    for(i of moveToProfilePage) {
        i.addEventListener("click", function () {
            window.open("./Profile/profile.html", '_blank');
        });
    }
}

if(switchAccountBtn) {
    for(i of switchAccountBtn) {
        i.addEventListener("click", function () {
            localStorage.setItem("isLogin", false);
            window.location.assign("./Login/login.html");
        });
    }
}

if(logOutBtn) {
    for(i of logOutBtn) {
        i.addEventListener("click", function () {
            localStorage.setItem("isLogin", false);
            window.location.assign("./index.html");
        })
    }
}

// Chuyển hướng đến trang giỏ hàng
const moveToCartBtn = document.querySelector(".move-to-cart-btn");
if(moveToCartBtn) {
    moveToCartBtn.addEventListener('click', function() {
        window.open('./Cart/cart.html', '_blank');
    });
}

// Render thông tin giỏ hàng ra pop-up
const cartPopup = document.querySelector(".cart-modal .container-fluid");
cartPopup.innerHTML = `<p class="empty-cart text-center">Không có sản phẩm nào trong giỏ hàng</p>`;
if (isLogin == "true") {
    moveToCartBtn.classList.remove("disabled");

    for(let i = 0; i < localStorage.length; i++) {
        const emptyCartNotification = document.querySelector(".empty-cart");
        key = parseInt(Object.keys(localStorage)[i]);
        if(!isNaN(key)) {  
            if(emptyCartNotification) emptyCartNotification.remove();       
            itemRender = JSON.parse(localStorage.getItem(key));
            cartPopup.innerHTML += `
            <div class="row cart-item align-items-center mb-3">
                <img src="${itemRender.photo}" alt="" class="col-2 p-0" style="height: 50px; object-fit: contain;">
                <p class="col-6" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" >${itemRender.model}</p>
                <p class="col-4">${itemRender.price}</p>
            </div>
            `
        }
    } 
}

else {
    cartPopup.innerHTML = `
    <div class="row">
        <p class="text-center col-12">Bạn chưa đăng nhập.</p>
        <a class="text-center col-12" style="color: var(--main-color); font-weight: 600;" href="/Login/login.html">Đăng nhập ngay?</a>
    </div>`
    moveToCartBtn.classList.add("disabled");
}

const headerFormSearch = document.querySelector("header .form-search");
const headerFormSearchInput = headerFormSearch.querySelector("input");
headerFormSearch.addEventListener("submit", function () {
    localStorage.setItem("SearchingInput", headerFormSearchInput.value);
    window.open("./Search/search.html", '_blank');
})


