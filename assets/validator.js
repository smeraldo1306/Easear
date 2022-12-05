(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const form = document.querySelector('.needs-validation');
    const nameInput = form.querySelector(".name-input");
    const emailInput = form.querySelector(".email-input");
    const passwordInput = form.querySelector(".password-input");
    const passwordConfirmInput = form.querySelector(".password-confirm-input");
    const passwordMatch = form.querySelector(".password-match");

  
    // Loop over them and prevent submission
    form.addEventListener('submit', event => {
        if (!form.checkValidity()) {

            if(nameInput) {
                var nameErrorMessage = nameInput.parentElement.querySelector(".invalid-feedback");
                
                if(!nameInput.checkValidity()) {
                    nameErrorMessage.innerText = 'Vui lòng nhập trường này'
                }
                nameInput.oninput = function () {
                    nameErrorMessage.innerText = '';
                }
            }

            if(emailInput) {
                var emailInputValue = emailInput.value;
                var emailErrorMessage = emailInput.parentElement.querySelector(".invalid-feedback");

                if(!emailInput.checkValidity()) {
                    if(emailInputValue.length == 0) {
                        emailErrorMessage.innerText = 'Vui lòng nhập trường này';
                    }
                    else {
                        emailErrorMessage.innerText = 'Vui lòng nhập email hợp lệ';
                    }
                    emailInput.oninput = function () {
                        emailErrorMessage.innerText = '';
                    }
                }
            }

            if(passwordInput) {
                var passwordInputValue = passwordInput.value;
                var passwordErrorMessage = passwordInput.parentElement.querySelector(".invalid-feedback");

                if(!passwordInput.checkValidity()) {
                    if(passwordInputValue.length == 0) {
                        passwordErrorMessage.innerText = 'Vui lòng nhập trường này';
                    }
                    else {
                        var minlengthPass = parseInt(passwordInput.getAttribute("minlength"));
                        if (passwordInputValue.length < minlengthPass) {
                            passwordErrorMessage.innerText = `Vui lòng nhập tối thiểu ${minlengthPass} kí tự`;
                        }
                    }
                }
                passwordInput.oninput = function () {
                    passwordErrorMessage.innerText = '';
                }
            }

            if(passwordConfirmInput) {
                var passwordConfirmInputValue = passwordConfirmInput.value;
                var passwordConfirmErrorMessage = passwordConfirmInput.parentElement.querySelector(".invalid-feedback");

                if(!passwordConfirmInput.checkValidity()) {
                    if(passwordConfirmInputValue.length == 0) {
                        passwordConfirmErrorMessage.innerText = 'Vui lòng nhập trường này';
                    }
                    else {
                        var minlengthPass = parseInt(passwordConfirmInput.getAttribute("minlength"));
                        passwordConfirmErrorMessage.innerText = `Vui lòng nhập tối thiểu ${minlengthPass} kí tự`;
                    }
                    passwordConfirmInput.oninput = function () {
                        passwordConfirmErrorMessage.innerText = '';
                        
                    }
                    
                }      
            }

            if(passwordMatch) {
                    if(passwordConfirmInput.checkValidity()) {
                        if(passwordConfirmInputValue != passwordInputValue) {
                            passwordConfirmInput.value = '';
                            passwordConfirmErrorMessage.innerText = 'Mật khẩu không khớp'
                        }
                        else passwordMatch.click();
                    }
                
            }

            event.preventDefault();
            event.stopPropagation();
  
            form.classList.add('was-validated');
        }
        
    }, false)
})()

