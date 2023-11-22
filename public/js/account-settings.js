// Temprarily displayed the uploaded image

document.getElementById("avatar").onchange = function() {
    document.getElementById("uploadForm").submit();
};

document.addEventListener('DOMContentLoaded', function() {
    const accPassword = document.getElementById('acc-password');
    const accShowHidePassword = document.getElementById('acc-show-hide-password');

    const accConfirmPassword = document.getElementById('acc-confirm-password');
    const accShowHideConfirmPassword = document.getElementById('acc-confirm-show-hide-password');


    accShowHidePassword.addEventListener('click', function() {
        if (accPassword.type === 'password') {
            accPassword.type = 'text';
            // Change the icon to show the eye opened
            accShowHidePassword.innerHTML = '<i class="fas fa-eye"></i>';
        } else {
            accPassword.type = 'password';
            // Change the icon to show the eye closed
            accShowHidePassword.innerHTML = '<i class="fas fa-eye-slash"></i>';
        }
    });

    accShowHideConfirmPassword.addEventListener('click', function() {
        if (accConfirmPassword.type === 'password') {
            accConfirmPassword.type = 'text';
            // Change the icon to show the eye opened
            accShowHideConfirmPassword.innerHTML = '<i class="fas fa-eye"></i>';
        } else {
            accConfirmPassword.type = 'password';
            // Change the icon to show the eye closed
            accShowHideConfirmPassword.innerHTML = '<i class="fas fa-eye-slash"></i>';
        }
    });
});