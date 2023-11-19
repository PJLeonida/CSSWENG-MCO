console.log("The application is running!")

document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.querySelector("#login-btn");
    const registerBtn = document.querySelector("#register-btn");
    const logoutBtn = document.querySelector("#logout-btn");
    const addEmployeeBtn = document.querySelector("#add-employee-btn");
    const submitEmployeeBtn = document.querySelector("#submit-employee-btn");
    const createNewTrackerBtn = document.querySelector("#create-new-tracker-btn");

    if (loginBtn) {
        loginBtn.addEventListener("click", function() {
            console.log("Login button clicked!")
        });
    }
    if (registerBtn) {
        registerBtn.addEventListener("click", function() {
            console.log("Register button clicked!")
        });
    }
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function() {
            console.log("Logout button clicked!")
        });
    }
    if (addEmployeeBtn) {
        addEmployeeBtn.addEventListener("click", function() {
            console.log("Add Employee button clicked!")
        });
    }
    if (submitEmployeeBtn) {
        submitEmployeeBtn.addEventListener("click", function() {
            console.log("Submit Employee button clicked!")
        });
    }
    if (createNewTrackerBtn) {
        createNewTrackerBtn.addEventListener("click", function() {
            console.log("Create New Tracker button clicked!")
        });
    }
});