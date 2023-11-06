/* Login Form */
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const passwordInput = document.getElementById('login-password');
    const showPasswordCheckbox = document.getElementById('login-show-password');

    showPasswordCheckbox.addEventListener('change', function() {
        // Toggle the visibility of the password input
        if (showPasswordCheckbox.checked) {
            passwordInput.type = 'text'; // Show password
        } else {
            passwordInput.type = 'password'; // Hide password
        }
    });

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Get the entered username and password
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        
        
        let isLoginSuccessful = false;

        // Perform client-side validation (e.g., check if fields are not empty)
        if (username === '' || password === '') {
            alert('Please fill in both fields.');
            return;
        } else {
            isLoginSuccessful = true;
        }
       

        if (!isLoginSuccessful) {
            alert('Login failed!');
            console.log('Login failed!');
            return;
        } else {
            alert('Login successful!');
            console.log('Login successful!');
            window.location.href = 'dashboard.html';
        }


        // Reset the form
        loginForm.reset();
    });
});


/* Register Form */
document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Get the entered username and password
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;
        
        let isRegisterSuccessful = false;

        // Perform client-side validation (e.g., check if fields are not empty)
        if (username === '' || password === '' || confirmPassword === '') {
            alert('Please fill in all fields.');
            return;
        } else if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        } else {
            isRegisterSuccessful = true;
        }
       

        if (!isRegisterSuccessful) {
            alert('Registration failed!');
            console.log('Registration failed!');
            return;
        } else {
            alert('Registration successful!');
            console.log('Registration successful!');
            window.location.href = 'dashboard.html';
        }

        // Reset the form
        registerForm.reset();
    });
});
