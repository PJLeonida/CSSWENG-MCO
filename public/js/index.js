/* Login Form */
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


$("#login-submit-btn").on('click', async function (event) {
    event.preventDefault();

    const companyID = $("#login-companyID").val();
    const loginPassword = $("#login-password").val();

    // Define an object to map field IDs to error message IDs
    const fieldErrorMap = {
        'login-companyID': 'login-companyID-message',
        'login-password': 'login-password-message'
    };

    // Iterate through each field and check if it's empty
    let hasErrors = false;
    for (const [field, errorMessage] of Object.entries(fieldErrorMap)) {
        const value = $(`#${field}`).val();
        if (value === '') {
            $(`#${errorMessage}`).html('Please fill out this field.').css('display', 'block');
            hasErrors = true;
        } else {
            $(`#${errorMessage}`).css('display', 'none');
        }
    }

    // Check if there are errors before making the fetch request
    if (hasErrors) {
        return;
    }

    // Check if the company ID exists
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




/* Register Form */
// Show/hide password
$("#register-show-hide-password").on('click', function() {
    if ($("#register-password").attr('type') === 'password') {
        $("#register-password").attr('type', 'text');
        // Change the icon to show the eye opened
        $("#register-show-hide-password").html('<i class="fas fa-eye"></i>');
    } else {
        $("#register-password").attr('type', 'password');
        // Change the icon to show the eye closed
        $("#register-show-hide-password").html('<i class="fas fa-eye-slash"></i>');
    }
});

$("#register-confirm-show-hide-password").on('click', function() {
    if ($("#register-confirmPassword").attr('type') === 'password') {
        $("#register-confirmPassword").attr('type', 'text');
        // Change the icon to show the eye opened
        $("#register-confirm-show-hide-password").html('<i class="fas fa-eye"></i>');
    } else {
        $("#register-confirmPassword").attr('type', 'password');
        // Change the icon to show the eye closed
        $("#register-confirm-show-hide-password").html('<i class="fas fa-eye-slash"></i>');
    }
});


$("#register-submit-btn").on('click', async function (event) {
    event.preventDefault();

    const companyID = $("#register-companyID").val();
    const registerPassword = $("#register-password").val();
    const registerConfirmPassword = $("#register-confirmPassword").val();

    // Define an object to map field IDs to error message IDs
    const fieldErrorMap = {
        'register-firstName': 'register-firstName-message',
        'register-lastName': 'register-lastName-message',
        'register-companyID': 'register-companyID-message',
        'register-password': 'register-password-message',
        'register-confirmPassword': 'register-confirmPassword-message'
    };

    // Iterate through each field and check if it's empty
    let hasErrors = false;
    for (const [field, errorMessage] of Object.entries(fieldErrorMap)) {
        const value = $(`#${field}`).val();
        if (value === '') {
            $(`#${errorMessage}`).html('Please fill out this field.').css('display', 'block');
            hasErrors = true;
        } else if (field === 'register-companyID' && value.length !== 10) {
            $(`#${errorMessage}`).html('Company ID must be 10 characters long.').css('display', 'block');
            hasErrors = true; 
        } else if (field === 'register-password' && value.length < 8) {
            $(`#${errorMessage}`).html('Password must be at least 8 characters long.').css('display', 'block');
            hasErrors = true;
        } else if (field === 'register-confirmPassword' && value.length > 8 && value !== registerConfirmPassword) {
            $(`#${errorMessage}`).html('Passwords do not match.').css('display', 'block');
            hasErrors = true;
        } else {
            $(`#${errorMessage}`).css('display', 'none');
        }
    }

    // Check if there are errors before making the fetch request
    if (hasErrors) {
        return;
    }

    const companyIDResponse = await fetch(`/register/isCompanyID?companyID=${companyID}`, {
        method: 'GET'
    });

    switch (companyIDResponse.status) {
        case 200:
            $("#register-companyID-message").text('Company ID already exists.').css('display', 'block');
            break;
        case 404:
            $("#register-form").submit();
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
