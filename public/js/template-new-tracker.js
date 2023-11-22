/*
    template-new-tracker.js
*/


document.addEventListener('DOMContentLoaded', function (e) {
    // Get references to the buttons
    const editButton = document.getElementById('edit-tracker-btn');
    const saveButton = document.getElementById('save-tracker-btn');
    const cancelButton = document.getElementById('cancel-tracker-btn');

    // Add event listener to the edit button
    editButton.addEventListener('click', function() {
        // Disable edit button
        editButton.disabled = true;
        editButton.style.color = '#FFFFFF';

        // Enable save and cancel buttons
        saveButton.disabled = false;
        saveButton.style.color = '#000000';
        cancelButton.disabled = false;
        cancelButton.style.color = '#000000';
    });

    // Add event listener to the cancel button and save button
    cancelButton.addEventListener('click', function() {
        // Disable save and cancel buttons
        saveButton.disabled = true;
        saveButton.style.color = '#FFFFFF';
        cancelButton.disabled = true;
        cancelButton.style.color = '#FFFFFF';

        // Enable edit button
        editButton.disabled = false;
        editButton.style.color = '#000000';
    });

    saveButton.addEventListener('click', function() {
        // Disable save and cancel buttons
        saveButton.disabled = true;
        saveButton.style.color = '#FFFFFF';
        cancelButton.disabled = true;
        cancelButton.style.color = '#FFFFFF';

        // Enable edit button
        editButton.disabled = false;
        editButton.style.color = '#000000';
    });
});