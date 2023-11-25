// Temprarily displayed the uploaded image
document.addEventListener('DOMContentLoaded', function() {
    const imageUpload = document.getElementById('image-upload');
    const imagePreview = document.getElementById('image-preview');

    imageUpload.addEventListener('change', function() {

        const file = this.files[0];

        if (file) {
            const reader = new FileReader();

            imagePreview.style.display = 'block';

            reader.addEventListener('load', function() {
                imagePreview.setAttribute('src', this.result);
            });

            reader.onerror = function() {
                console.log('Error: ', reader.error);
            };

            reader.readAsDataURL(file);
        } else {
            imagePreview.style.display = null;
            imagePreview.setAttribute('src', '');
        }


    });


});

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