/* New Tracker */
/*
    This allows the user to add a new employee using the answered form
    and add it to the table when creating a new tracker. 
    This also allows the user to edit the employee data in the table.
    This also allows the user to delete the employee data in the table.
    Simply, this temporarily stores the employee data in the table.
*/

// Path: src/js/employee.js
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

});


// Update the employee table after submitting the form
document.getElementById('employee-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the employee table
    const employeeListTable = document.getElementById('employee-table');

    // Get the table body
    const employeeListTableBody = employeeListTable.querySelector('tbody');

    // Add the employee data to the table
    for (let i = 0; i < employeeListData.length; i++) {
        const row = employeeListTableBody.insertRow(); // Create a new row

        // Insert cell data into the row
        row.insertCell().textContent = employeeListData[i].no;
        row.insertCell().textContent = employeeListData[i].firstName + ' ' + employeeListData[i].middleName + ' ' + employeeListData[i].lastName + ' ' + employeeListData[i].suffix;
        row.insertCell().textContent = employeeListData[i].position;
        row.insertCell().textContent = employeeListData[i].deployment;
        row.insertCell().textContent = employeeListData[i].rate;
        row.insertCell().textContent = employeeListData[i].totalRate;
        row.insertCell().innerHTML = '<button class="btn btn-warning btn-sm btn-edit-employee" id="btn-edit-employee">Edit</button>';
        row.insertCell().innerHTML = '<button class="btn btn-danger btn-sm btn-delete-employee" id="btn-delete-employee">Delete</button>';
    }

    // employeeListData.forEach((employee, index) => {
    //     const row = tableBody.insertRow();

    //     row.insertCell(0).innerText = index + 1;
    //     row.insertCell(1).innerText = `${employee.firstName} ${employee.middleName} ${employee.lastName} ${employee.suffix}`;
    //     row.insertCell(2).innerText = employee.position;
    //     row.insertCell(3).innerText = employee.deployment;
    //     row.insertCell(4).innerText = employee.rate;
    //     row.insertCell(5).innerText = employee.deployment * employee.rate;
    //     row.insertCell(6).innerHTML = '<button>Edit</button>';
    //     row.insertCell(7).innerHTML = '<button>Delete</button>';
    // });
});

document.getElementById('btn-create-new-tracker').addEventListener('click', function(event) {
    event.preventDefault();
    const projectName =  document.getElementById('new-project-name').value
    const projectDesc =  document.getElementById('new-project-desc').value
    const empList =  employeeListData;
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
    });
});

});

//     // Get the employee form
//     const employeeForm = document.getElementById('employee-form');

//     // Get the employee data from the table that the user wants to edit
//     const employeeFirstName = document.getElementById('employeeFirstName');
//     const employeeMiddleName = document.getElementById('employeeMiddleName');
//     const employeeLastName = document.getElementById('employeeLastName');
//     const employeeSuffix = document.getElementById('employeeSuffix');
//     const employeePosition = document.getElementById('employeePosition');
//     const employeeDeployment = document.getElementById('employeeDeployment');
//     const employeeRate = document.getElementById('employeeRate');

//     // Display the employee data to the form
//     employeeFirstName.value = employeeListData[0].firstName;
//     employeeMiddleName.value = employeeListData[0].middleName;
//     employeeLastName.value = employeeListData[0].lastName;
//     employeeSuffix.value = employeeListData[0].suffix;
//     employeePosition.value = employeeListData[0].position;
//     employeeDeployment.value = employeeListData[0].deployment;
//     employeeRate.value = employeeListData[0].rate;

//     // Update the employee data in the table
//     employeeListData[0].firstName = employeeFirstName.value;
//     employeeListData[0].middleName = employeeMiddleName.value;
//     employeeListData[0].lastName = employeeLastName.value;
//     employeeListData[0].suffix = employeeSuffix.value;
//     employeeListData[0].position = employeePosition.value;
//     employeeListData[0].deployment = employeeDeployment.value;
//     employeeListData[0].rate = employeeRate.value;
//     employeeListData[0].totalRate = employeeDeployment.value * employeeRate.value;

//     // Log to the console the employee data
//     console.log(employeeListData);

//     // Reset the form
//     employeeForm.reset();

//     // Log to the console that the form was reset
//     console.log('Form reset!');

//     // Update the employee table after submitting the form
//     // document.getElementById('employee-form').addEventListener('submit', function(event) {
// }