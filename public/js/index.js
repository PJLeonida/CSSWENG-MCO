/* Login Form */
// document.addEventListener('DOMContentLoaded', function() {
//     // const loginForm = document.getElementById('login-form');
//     const loginPassword = document.getElementById('login-password');
//     const loginShowHidePassword = document.getElementById('login-show-hide-password');

// const { $where } = require("../../server/schema/Users");


//     loginShowHidePassword.addEventListener('click', function() {
//         if (loginPassword.type === 'password') {
//             loginPassword.type = 'text';
//             // Change the icon to show the eye opened
//             loginShowHidePassword.innerHTML = '<i class="fas fa-eye"></i>';
//         } else {
//             loginPassword.type = 'password';
//             // Change the icon to show the eye closed
//             loginShowHidePassword.innerHTML = '<i class="fas fa-eye-slash"></i>';
//         }
//     });
// });


// Show/hide password
$("#login-show-hide-password").on('click', function() {
    if ($("#login-password").attr('type') === 'password') {
        $("#login-password").attr('type', 'text');
        // Change the icon to show the eye opened
        $("#login-show-hide-password").html('<i class="fas fa-eye"></i>');
    } else {
        $("#login-password").attr('type', 'password');
        // Change the icon to show the eye closed
        $("#login-show-hide-password").html('<i class="fas fa-eye-slash"></i>');
    }
});


// $("#login-submit-btn").on('click', async function(event) {
//     event.preventDefault();

//     const companyID = $("#login-companyID").val();
//     const loginPassword = $("#login-password").val();

//     const companyIDResponse = await fetch (`/login/isCompanyID?companyID=${companyID}`, {
//         method: 'GET'
//     });

//     switch(companyIDResponse.status) {
//         case 200:
//             // Check if the password is correct
//             const passwordResponse = await fetch (`/login/isPassword?companyID=${companyID}&password=${loginPassword}`, {
//                 method: 'GET'
//             });

//             switch(passwordResponse.status) {
//                 case 200:
//                     $("#login-form").submit();
//                     break;
//                 case 401:
//                     $("#login-password-message").html('Password is incorrect.');
//                     $("#login-password-message").css('display', 'block');
//                     break;
//                 default:
//                     console.log('Error');
//             }
//             break;
//         case 404:
//             $("#login-companyID-message").html('Company ID not found.');
//             $("#login-companyID-message").css('display', 'block');
//             break;
//         default:
//             console.log('Error');
//     }
// });


$("#login-submit-btn").on('click', async function (event) {
    event.preventDefault();

    const companyID = $("#login-companyID").val();
    const loginPassword = $("#login-password").val();

    const companyIDResponse = await fetch(`/login/isCompanyID?companyID=${companyID}`, {
        method: 'GET'
    });

    switch (companyIDResponse.status) {
        case 200:
            // Check if the password is correct
            const passwordResponse = await fetch(`/login/isPassword?companyID=${companyID}&password=${loginPassword}`, {
                method: 'GET'
            });

            switch (passwordResponse.status) {
                case 200:
                    $("#login-form").submit();
                    break;
                case 401:
                    $("#login-password-message").html('Password is incorrect.');
                    $("#login-password-message").css('display', 'block');
                    $("#login-companyID-message").css('display', 'none');
                    break;
                default:
                    console.log('Error');
            }
            break;
        case 404:
            $("#login-companyID-message").html('Company ID not found.');
            $("#login-companyID-message").css('display', 'block');
            break;
        default:
            console.log('Error');
    }
});


 

 






// /* Register Form */
// document.addEventListener('DOMContentLoaded', function() {
//     // const registerForm = document.getElementById('register-form');
//     const registerPassword = document.getElementById('register-password');
//     const registerConfirmPassword = document.getElementById('register-confirmPassword');

//     // Show/hide password
//     const registerShowHidePassword = document.getElementById('register-show-hide-password');
//     const registerConfirmShowHidePassword = document.getElementById('register-confirm-show-hide-password');

//     registerShowHidePassword.addEventListener('click', function() {
//         if (registerPassword.type === 'password') {
//             registerPassword.type = 'text';
//             // Change the icon to show the eye opened
//             registerShowHidePassword.innerHTML = '<i class="fas fa-eye"></i>';
//         } else {
//             registerPassword.type = 'password';
//             // Change the icon to show the eye closed
//             registerShowHidePassword.innerHTML = '<i class="fas fa-eye-slash"></i>';
//         }
//     });

//     registerConfirmShowHidePassword.addEventListener('click', function() {
//         if (registerConfirmPassword.type === 'password') {
//             registerConfirmPassword.type = 'text';
//             // Change the icon to show the eye opened
//             registerConfirmShowHidePassword.innerHTML = '<i class="fas fa-eye"></i>';
//         } else {
//             registerConfirmPassword.type = 'password';
//             // Change the icon to show the eye closed
//             registerConfirmShowHidePassword.innerHTML = '<i class="fas fa-eye-slash"></i>';
//         }
//     });

//     // Check if the password and confirm password fields match
//     registerConfirmPassword.addEventListener('keyup', function() {
//         if (registerPassword.value !== registerConfirmPassword.value) {
//             registerConfirmPassword.setCustomValidity('Passwords do not match.');
//         } else {
//             registerConfirmPassword.setCustomValidity('');
//         }
//     });

//     // registerForm.addEventListener('submit', function(event) {
//     //     event.preventDefault();

//     //     // Get the entered username and password
//     //     const firstName = document.getElementById('register-firstName').value;
//     //     const middleName = document.getElementById('register-middleName').value;
//     //     const lastName = document.getElementById('register-lastName').value;
//     //     const suffix = document.getElementById('register-suffix').value;
//     //     const companyID = document.getElementById('register-companyID').value;
//     //     const password = document.getElementById('register-password').value;
//     //     const confirmPassword = document.getElementById('register-confirmPassword').value;

//     //     // Perform client-side validation (e.g., check if fields are not empty)
//     //     if (firstName === '' || lastName === '' || companyID === '' || password === '' || confirmPassword === '') {
//     //         firstName.setCustomValidity('Please fill out this field.');
//     //         return;
//     //     }

//     //     // Perform client-side validation (e.g., check if passwords match)
//     //     if (password !== confirmPassword) {
//     //         alert('Passwords do not match.');
//     //         return;
//     //     }

//     //     // Perform client-side validation (e.g., check if password is at least 8 characters long)
//     //     if (password.length < 8) {
//     //         alert('Password must be at least 8 characters long.');
//     //         return;
//     //     }

//     //     // Perform client-side validation (e.g., check if company ID is 10 characters long)
//     //     if (companyID.length !== 10) {
//     //         alert('Company ID must be 10 characters long.');
//     //         return;
//     //     }

//     //     // Perform client-side validation (e.g., check if company ID is a number)
//     //     if (isNaN(companyID)) {
//     //         alert('Company ID must be a number.');
//     //         return;
//     //     }


//     // });
// });
