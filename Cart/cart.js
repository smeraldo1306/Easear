
const cartItemContainer = document.querySelector("main .cart");
const modalDelete = document.querySelector(".modal");
const modalDeleteBody = modalDelete.querySelector(".modal-body");
const acceptToDeleteBtn = modalDelete.querySelector(".accept-btn");
const closeModalBtn = modalDelete.querySelector(".btn-close");

const checkout = document.querySelector(".checkout");
const subtotal = checkout.querySelector(".subtotal");
const shippingFee = checkout.querySelector(".shipping-fee");
const total = checkout.querySelector(".total");
const totalConfirm = document.querySelector(".checkout-confirm .total");
const checkoutConfirmBtn = document.querySelector(".checkout-confirm-btn");

function loadCart() {
    var subtotalTemp = 0;
    var shippingFeeTemp = 30000;
    cartItemContainer.innerHTML = `
    <h1 class="col-12 ps-3 mt-3">Giỏ hàng của tôi</h1>
    <p class="empty-cart text-center mt-4">Không có sản phẩm nào trong giỏ hàng</p>
    `;
    for(let i = 0; i < localStorage.length; i++) {
        

        key = parseInt(Object.keys(localStorage)[i]);
        if(!isNaN(key)) {  
            const emptyCartNotification = document.querySelector(".empty-cart");
            if(emptyCartNotification) {
                emptyCartNotification.remove();
            } else {
            }
            var itemRender = JSON.parse(localStorage.getItem(key));
            cartItemContainer.innerHTML += `
            <div class="cart-items col-12">
                <div class="row m-0">
                    <div class="cart-item-img col-3">
                        <img src="${itemRender.photo}" alt="">
                    </div>
                    <div class="cart-item-info col-9 pe-0">
                        <h6>${itemRender.model}</h6>
                        <p>${itemRender.price}</p>
                        <div class="cart-item-btn">
                            <div class="change-number-btn" id="${itemRender.index}">
                                <button class="decrease-btn">-</button>
                                <span class="d-flex align-items-center">
                                    <p class="amount">${itemRender.amount}</p>
                                </span>
                                <button class="increase-btn">+</button>
                            </div>
                            
                            <button class="remove-item-btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                <i class="fa-regular fa-trash-can"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            `;
            subtotalTemp += parseInt(itemRender.price.split('.').join('')) * itemRender.amount;
        }
    } 
    
    const config = { style: 'currency', currency: 'VND' };
    const emptyCartNotification = document.querySelector(".empty-cart");

    subtotal.innerText = new Intl.NumberFormat('vi-VN', config).format(subtotalTemp);

    if(emptyCartNotification) {
        shippingFee.innerText = new Intl.NumberFormat('vi-VN', config).format(0);
        if(checkoutConfirmBtn) {
            checkoutConfirmBtn.classList.add("disabled");
        }

    }
    else {
        checkoutConfirmBtn.classList.remove("disabled");
        shippingFee.innerText = new Intl.NumberFormat('vi-VN', config).format(shippingFeeTemp);
        total.innerText = new Intl.NumberFormat('vi-VN', config).format(subtotalTemp + shippingFeeTemp);
    }

    totalConfirm.innerText = total.innerText;

};

loadCart();


const liveToast = document.getElementById('liveToast');
const toastBody = liveToast.querySelector(".toast-body");
checkoutConfirmBtn.addEventListener("click", function () {
    const toast = new bootstrap.Toast(liveToast);
    liveToast.style.border = "1px solid green";
    liveToast.style.background = "rgba(209, 231, 221, 0.9)";
    toastBody.innerHTML = `<p>Đặt hàng thành công</p>`
    toast.show();
    setTimeout(function() {
        window.close();
    }, 1500)

})

//Thông báo giảm số lượng khi số lượng mặc định là 1
const amountOfItems = document.querySelectorAll(".cart-item-btn span");
console.log(amountOfItems)
amountOfItems.forEach(function(amount) {
    if(parseInt(amount.innerText) == 1) {
        var decreaseAmountBtn = amount.previousElementSibling;
        decreaseAmountBtn.setAttribute("data-bs-toggle", "modal");
        decreaseAmountBtn.setAttribute("data-bs-target", "#staticBackdrop");
    }
})

// Tăng số lượng
const increaseAmountBtn = document.querySelectorAll("button.increase-btn");
increaseAmountBtn.forEach(function(btn) {
    btn.addEventListener("click", function() {
        var decreaseAmountBtn = btn.previousElementSibling.previousElementSibling;
        decreaseAmountBtn.removeAttribute("data-bs-toggle", "modal");
        decreaseAmountBtn.removeAttribute("data-bs-target", "#staticBackdrop");
        var key = btn.parentElement.id;
        var currentItem = JSON.parse(localStorage.getItem(key));
        currentItem["amount"]++;
        localStorage.setItem(key, JSON.stringify(currentItem));
        btn.parentElement.querySelector(".amount").innerText++;
        location.reload();
    });
});

// Giảm số lượng
const decreaseAmountBtn = document.querySelectorAll("button.decrease-btn");
decreaseAmountBtn.forEach(function(btn) {
    btn.addEventListener("click", function() {
        var key = btn.parentElement.id;
        var currentItem = JSON.parse(localStorage.getItem(key));
        var itemSelectedModel = JSON.parse(localStorage.getItem(key)).model;
        if(currentItem["amount"] > 1) {
            if(currentItem["amount"] == 2) {
                btn.setAttribute("data-bs-toggle", "modal");
                btn.setAttribute("data-bs-target", "#staticBackdrop");
            }
            currentItem["amount"]--;
            localStorage.setItem(key, JSON.stringify(currentItem));
            btn.parentElement.querySelector(".amount").innerText--;
           location.reload();
        }
        else { 
                modalDeleteBody.innerHTML = `<p>Giảm số lượng về 0 sẽ xoá sản phẩm ${itemSelectedModel} ra khỏi giỏ hàng. Bạn vẫn muốn tiếp tục?</p>`;
                acceptToDeleteBtn.addEventListener("click", function() {
                localStorage.removeItem(key);
                closeModalBtn.click();
                location.reload();
            });
        };
    });
});


// Xoá sản phẩm ra khỏi giỏ hàng
const deleteItemBtn = document.querySelectorAll("button.remove-item-btn");
deleteItemBtn.forEach(function(btn) {
    btn.addEventListener("click", function() {
        var key = btn.previousElementSibling.id;
        var itemSelectedModel = JSON.parse(localStorage.getItem(key)).model;
        modalDeleteBody.innerHTML = `<p>Bạn chắc chắn muốn xoá sản phẩm ${itemSelectedModel} ra khỏi giỏ hàng?</p>`
        acceptToDeleteBtn.addEventListener("click", function() {
            localStorage.removeItem(key);
            closeModalBtn.click();
            location.reload();
        });
    });
});

//Tính tổng tiền cho đơn hàng


window.onstorage = function() {
    loadCart();
    location.reload();
};

