/* New Tracker */
/*
    This allows the user to add a new employee using the answered form
    and add it to the table when creating a new tracker. 
    This also allows the user to edit the employee data in the table.
    This also allows the user to delete the employee data in the table.
    Simply, this temporarily stores the employee data in the table.
*/

// Path: src/js/employee.js



// Function that checks whenever the user clicks and interchanges the project status
// every time the user choose ON-GOING, the new-project-end-date will be disabled
// every time the user choose COMPLETED, the new-project-end-date will be enabled
document.getElementById('new-project-status').addEventListener('change', function(event) {
    event.preventDefault();

    const projectStatus = document.getElementById('new-project-status').value;

    if (projectStatus === 'ON-GOING') {
        document.getElementById('new-project-end-date').setAttribute('disabled', true);
    } else if (projectStatus === 'COMPLETED') {
        document.getElementById('new-project-end-date').removeAttribute('disabled');
        document.getElementById('new-project-end-date').setAttribute('required', true);
    }
});

// Function to limit the new-project-end-date must be after the new-project-start-date but not the current date
document.getElementById('new-project-start-date').addEventListener('change', function(event) {
    event.preventDefault();
    
    const startDate = document.getElementById('new-project-start-date').value;

    document.getElementById('new-project-end-date').setAttribute('min', startDate);

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    const currentDateFormatted = `${currentYear}-${currentMonth}-${currentDay}`;

    document.getElementById('new-project-end-date').setAttribute('max', currentDateFormatted);
});

document.addEventListener('DOMContentLoaded',  function (e) {
    e.preventDefault();
    // Global variable to store the employee data
    let employeeListData = [];

    
    document.getElementById('employee-form').addEventListener('submit', function(event) {
        event.preventDefault();
    
        const employeeFirstName = document.getElementById('employeeFirstName').value;
        const employeeMiddleName = document.getElementById('employeeMiddleName').value;
        const employeeLastName = document.getElementById('employeeLastName').value;
        const employeeSuffix = document.getElementById('employeeSuffix').value;
        const employeePosition = document.getElementById('employeePosition').value;
        const employeeDeployment = parseFloat(document.getElementById('employeeDeployment').value);
        const employeeRate = parseFloat(document.getElementById('employeeRate').value);
    
        let employeeTotalRate = employeeDeployment * employeeRate;
    
        // Log to the console the values
        console.log(employeeFirstName);
        console.log(employeeMiddleName);
        console.log(employeeLastName);
        console.log(employeeSuffix);
        console.log(employeePosition);
        console.log(employeeDeployment);
        console.log(employeeRate);
        console.log(employeeTotalRate);
    
        // Add the employee data to the global variable
        employeeListData.push({
            no: employeeListData.length + 1, // Auto-generate a unique ID
            firstName: employeeFirstName,
            middleName: employeeMiddleName,
            lastName: employeeLastName,
            suffix: employeeSuffix,
            position: employeePosition,
            deployment: employeeDeployment,
            rate: employeeRate,
            totalRate: employeeTotalRate
        });
    
        // Log to the console the employee data
        console.log(employeeListData);
    
        // Reset the form
        document.getElementById('employee-form').reset();
    
        // Log to the console that the form was reset
        console.log('Form reset!');
    
        // Get the employee table
        const employeeListTable = document.getElementById('employee-table');
    
        // Get the table body
        const employeeListTableBody = employeeListTable.querySelector('tbody');
    

        const row = employeeListTableBody.insertRow(); // Create a new row
    
        // Insert cell data into the row
        row.insertCell().textContent = employeeListData.length;
        row.insertCell().textContent = employeeFirstName + ' ' + employeeMiddleName + ' ' + employeeLastName + ' ' + employeeSuffix;
        row.insertCell().textContent = employeePosition;
        row.insertCell().textContent = employeeDeployment;
        row.insertCell().textContent = employeeRate;
        row.insertCell().textContent = employeeTotalRate;
        row.insertCell().innerHTML = '<button class="btn btn-warning btn-sm btn-edit-employee" id="btn-edit-employee">Edit</button>';
        row.insertCell().innerHTML = '<button class="btn btn-danger btn-sm btn-delete-employee" id="btn-delete-employee">Delete</button>';
        

    });
    
    $("#btn-create-new-tracker").on('click', async function (event) {
        event.preventDefault();
    
        const projectName = $("#new-project-name").val();
        const projectDesc = $("#new-project-desc").val();
        const projectLoc = $("#new-project-location").val();
        const empList =  employeeListData;
    
        // Define an object to map field IDs to error message IDs
        const fieldErrorMap = {
            'new-project-name': 'project-name-message',
            'new-project-desc': 'project-desc-message',
            'new-project-location': 'project-location-message'
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

        const data = JSON.stringify({
            action: 'create-new-tracker',
            new_project_name: projectName,
            new_project_descr: projectDesc,
            employeeListData: empList
        })

        fetch('/new-tracker', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify(employeeListData)
            body: data
        }).then(response => {
            if (response.ok) {
                return response.json(); // Assuming your server sends JSON data
            } else {
                throw new Error('Failed to create tracker');
            }
        })
        .then(data => {
            if (data.redirect) {
                window.location.href = data.redirect; // Redirect if the server sends a redirect URL
            } else {
                // Handle other data from the server if needed
            }
        })
    });
    /*
    document.getElementById('btn-create-new-tracker').addEventListener('click', function(event) {
        event.preventDefault();
        const projectName =  document.getElementById('new-project-name').value
        const projectDesc =  document.getElementById('new-project-desc').value
        const empList =  employeeListData;
        // Log to the console that the form was reset
        //console.log('Form reset!');
        
        const data = JSON.stringify({
            action: 'create-new-tracker',
            new_project_name: projectName,
            new_project_descr: projectDesc,
            employeeListData: empList
        })
        // Send AJAX request to server
        fetch('/new-tracker', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify(employeeListData)
            body: data
        }).then(response => {
            if (response.ok) {
                return response.json(); // Assuming your server sends JSON data
            } else {
                throw new Error('Failed to create tracker');
            }
        })
        .then(data => {
            if (data.redirect) {
                window.location.href = data.redirect; // Redirect if the server sends a redirect URL
            } else {
                // Handle other data from the server if needed
            }
        })
    });*/
});