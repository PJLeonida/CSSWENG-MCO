/* Login Form */
document.addEventListener('DOMContentLoaded', function() {
    // const loginForm = document.getElementById('login-form');
    const loginPassword = document.getElementById('login-password');
    const loginShowHidePassword = document.getElementById('login-show-hide-password');


    loginShowHidePassword.addEventListener('click', function() {
        if (loginPassword.type === 'password') {
            loginPassword.type = 'text';
            // Change the icon to show the eye opened
            loginShowHidePassword.innerHTML = '<i class="fas fa-eye"></i>';
        } else {
            loginPassword.type = 'password';
            // Change the icon to show the eye closed
            loginShowHidePassword.innerHTML = '<i class="fas fa-eye-slash"></i>';
        }
    });

    
    // Check if company IDN is valid
    const loginCompanyID = document.getElementById('login-companyID');

    loginCompanyID.addEventListener('keyup', function() {
        if (loginCompanyID.value.length !== 10) {
            loginCompanyID.setCustomValidity('Company ID must be 10 characters long.');
        } else {
            loginCompanyID.setCustomValidity('');
        }
    });


    // Sent an AJAX request to the server to check if the username and password are correct
    // if the username and password are correct, redirect the user to the dashboard page
    // if the username and password are incorrect, display an error message
    // loginForm.addEventListener('submit', function(event) {
    //     event.preventDefault();

    //     // Get the entered username and password
    //     const username = document.getElementById('login-username').value;
    //     const password = document.getElementById('login-password').value;

    //     // Perform client-side validation (e.g., check if fields are not empty)
    //     if (username === '' || password === '') {
    //         alert('Please fill out this field.');
    //         return;
    //     }

    //     // Perform client-side validation (e.g., check if password is at least 8 characters long)
    //     if (password.length < 8) {
    //         alert('Password must be at least 8 characters long.');
    //         return;

    //     }

    //     // Send an AJAX request to the server
    //     const xhr = new XMLHttpRequest();
    //     xhr.open('POST', '/login');
    //     xhr.setRequestHeader('Content-Type', 'application/json');
    //     xhr.onload = function() {
    //         const response = JSON.parse(xhr.responseText);

    //         if (response.success) {
    //             // Redirect the user to the dashboard page
    //             window.location.href = '/dashboard';
    //         } else {
    //             alert('Incorrect username or password.');
    //         }
    //     };
    //     xhr.send(JSON.stringify({
    //         username: username,
    //         password: password
    //     }));
    // });


});


/* Register Form */
document.addEventListener('DOMContentLoaded', function() {
    // const registerForm = document.getElementById('register-form');
    const registerPassword = document.getElementById('register-password');
    const registerConfirmPassword = document.getElementById('register-confirmPassword');

    // Show/hide password
    const registerShowHidePassword = document.getElementById('register-show-hide-password');
    const registerConfirmShowHidePassword = document.getElementById('register-confirm-show-hide-password');

    registerShowHidePassword.addEventListener('click', function() {
        if (registerPassword.type === 'password') {
            registerPassword.type = 'text';
            // Change the icon to show the eye opened
            registerShowHidePassword.innerHTML = '<i class="fas fa-eye"></i>';
        } else {
            registerPassword.type = 'password';
            // Change the icon to show the eye closed
            registerShowHidePassword.innerHTML = '<i class="fas fa-eye-slash"></i>';
        }
    });

    registerConfirmShowHidePassword.addEventListener('click', function() {
        if (registerConfirmPassword.type === 'password') {
            registerConfirmPassword.type = 'text';
            // Change the icon to show the eye opened
            registerConfirmShowHidePassword.innerHTML = '<i class="fas fa-eye"></i>';
        } else {
            registerConfirmPassword.type = 'password';
            // Change the icon to show the eye closed
            registerConfirmShowHidePassword.innerHTML = '<i class="fas fa-eye-slash"></i>';
        }
    });

    // Check if the password and confirm password fields match
    registerConfirmPassword.addEventListener('keyup', function() {
        if (registerPassword.value !== registerConfirmPassword.value) {
            registerConfirmPassword.setCustomValidity('Passwords do not match.');
        } else {
            registerConfirmPassword.setCustomValidity('');
        }
    });

    // Check if company ID is valid
    const registerCompanyID = document.getElementById('register-companyID');

    registerCompanyID.addEventListener('keyup', function() {
        if (registerCompanyID.value.length !== 10) {
            registerCompanyID.setCustomValidity('Company ID must be 10 characters long.');
        } else {
            registerCompanyID.setCustomValidity('');
        }
    });


    // Sent an AJAX request to the server to check if the username and password are correct
});
