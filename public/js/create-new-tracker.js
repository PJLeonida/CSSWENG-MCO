/* New Tracker */
/*
    This allows the user to add a new employee using the answered form
    and add it to the table when creating a new tracker. 
    This also allows the user to edit the employee data in the table.
    This also allows the user to delete the employee data in the table.
    Simply, this temporarily stores the employee data in the table.
*/

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
