/* Login Form */
// document.addEventListener('DOMContentLoaded', function() {
//     const loginForm = document.getElementById('login-form');

//     loginForm.addEventListener('submit', function(event) {
//         event.preventDefault();

//         // Get the entered username and password
//         const username = document.getElementById('login-companyID').value;
//         const password = document.getElementById('login-password').value;
        
        
//         let isLoginSuccessful = false;

//         // Perform client-side validation (e.g., check if fields are not empty)
//         if (username === '' || password === '') {
//             alert('Please fill in both fields.');
//             return;
//         } else {
//             isLoginSuccessful = true;
//         }
       

//         if (!isLoginSuccessful) {
//             alert('Login failed!');
//             console.log('Login failed!');
//             return;
//         } else {
//             alert('Login successful!');
//             console.log('Login successful!');
//             window.location.href = 'landing-page.html';
//         }


//         // Reset the form
//         loginForm.reset();
//     });
// });


/* Register Form */
document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');
    const registerPassword = document.getElementById('register-password');
    const registerConfirmPassword = document.getElementById('register-confirm-password');

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

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Get the entered username and password
        const firstName = document.getElementById('register-first-name').value;
        const middleName = document.getElementById('register-middle-name').value;
        const lastName = document.getElementById('register-last-name').value;
        const suffix = document.getElementById('register-suffix').value;
        const companyID = document.getElementById('register-companyID').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;

        // Perform client-side validation (e.g., check if fields are not empty)
        if (firstName === '' || lastName === '' || companyID === '' || password === '' || confirmPassword === '') {
            alert('Please fill in all fields.');
            return;
        }

        // Perform client-side validation (e.g., check if passwords match)
        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        // Perform client-side validation (e.g., check if password is at least 8 characters long)
        if (password.length < 8) {
            alert('Password must be at least 8 characters long.');
            return;
        }

        // Perform client-side validation (e.g., check if company ID is 10 characters long)
        if (companyID.length !== 10) {
            alert('Company ID must be 10 characters long.');
            return;
        }

        // Perform client-side validation (e.g., check if company ID is a number)
        if (isNaN(companyID)) {
            alert('Company ID must be a number.');
            return;
        }

        // Send the data to the main process (Electron) using IPC
        const { ipcRenderer } = require('electron');
        ipcRenderer.send('register', {
            firstName,
            middleName,
            lastName,
            suffix,
            companyID,
            password,
        });

    });
});
