/* New Tracker */
/*
    This allows the user to add a new employee using the answered form
    and add it to the table when creating a new tracker. 
    This also allows the user to edit the employee data in the table.
    This also allows the user to delete the employee data in the table.
    Simply, this temporarily stores the employee data in the table.
*/

// Path: src/js/employee.js

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
        row.insertCell().innerHTML = '<button class="btn btn-warning btn-sm btn-edit-employee" onclick="editEmployeeRow(this)" >Edit</button>';
        row.insertCell().innerHTML = '<button class="btn btn-danger btn-sm btn-delete-employee" onclick="deleteEmployeeRow(this)">Delete</button>';
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

document.getElementById('btn-create-new-tracker').addEventListener('submit', function() {
    event.preventDefault();

    // Send AJAX request to server
    fetch('/new-tracker', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify(employeeListData)
        body: JSON.stringify({
            action: 'create-new-tracker',
            new_project_name: document.getElementById('newProjectName').value,
            new_project_descr: document.getElementById('newProjectDescription').value,
            employeeListData: employeeListData
        })
    });
});









// function initializeNewTracker() {
//     const employeeForm = document.getElementById('employee-form');
//     const employeeTable = document.querySelector('#employee-table tbody');

//     if (employeeForm) {
//         employeeForm.addEventListener('submit', function(event) {
//             event.preventDefault();

//             const employeeFirstName = document.getElementById('employeeFirstName').value;
//             const employeeMiddleName = document.getElementById('employeeMiddleName').value;
//             const employeeLastName = document.getElementById('employeeLastName').value;
//             const employeeSuffix = document.getElementById('employeeSuffix').value;
//             const employeePosition = document.getElementById('employeePosition').value;
//             const employeeDeployment = parseFloat(document.getElementById('employeeDeployment').value);
//             const employeeRate = parseFloat(document.getElementById('employeeRate').value);

//             let employeeFullName = employeeFirstName + ' ' + employeeMiddleName + ' ' + employeeLastName + ' ' + employeeSuffix;
//             let employeeTotalRate = employeeDeployment * employeeRate;

//             /* Log to the console the values */
//             console.log(employeeFirstName);
//             console.log(employeeMiddleName);
//             console.log(employeeLastName);
//             console.log(employeeSuffix);
//             console.log(employeePosition);
//             console.log(employeeDeployment);
//             console.log(employeeRate);
//             console.log(employeeFullName);
//             console.log(employeeTotalRate);
            
//             const employee = {
//                 no: employeeTable.rows.length + 1, // Auto-generate a unique ID
//                 fullname: employeeFullName,
//                 position: employeePosition,
//                 deployment: employeeDeployment,
//                 rate: employeeRate,
//                 totalRate: employeeTotalRate
//             };

//             const row = employeeTable.insertRow(); // Create a new row

//             // Insert cell data into the row
//             row.insertCell().textContent = employee.no;
//             row.insertCell().textContent = employee.fullname;
//             row.insertCell().textContent = employee.position;
//             row.insertCell().textContent = employee.deployment;
//             row.insertCell().textContent = employee.rate;
//             row.insertCell().textContent = employee.totalRate;
//             row.insertCell().innerHTML = '<button class="btn btn-warning btn-sm btn-edit-employee" onclick="editEmployeeRow(this)" >Edit</button>';
//             row.insertCell().innerHTML = '<button class="btn btn-danger btn-sm btn-delete-employee" onclick="deleteEmployeeRow(this)">Delete</button>';

//             /* Reset the form */
//             employeeForm.reset();

//             /* Log to the console that the form was reset */
//             console.log('Form reset!');
//         });
//     }
// }

// // function editEmployeeRow(button) {

// //     console.log('Edit button clicked!');

// //     const row = button.parentNode.parentNode;
    
// //     // Get the Employee Modal
// //     const employeeModal = document.getElementById('employeeModal');

// //     // Get the data from the row
// //     const no = row.cells[0].innerHTML;
// //     const fullname = row.cells[1].innerHTML;
// //     const position = row.cells[2].innerHTML;
// //     const deployment = row.cells[3].innerHTML;
// //     const rate = row.cells[4].innerHTML;
// //     const totalRate = row.cells[5].innerHTML;

// //     // Populate the modal with the data
// //     // document.getElementById('editEmployeeNo').value = no;
// //     // document.getElementById('editEmployeeFullName').value = fullname;
// //     document.getElementById('editEmployeePosition').value = position;
// //     document.getElementById('editEmployeeDeployment').value = deployment;
// //     document.getElementById('editEmployeeRate').value = rate;
// //     // document.getElementById('editEmployeeTotalRate').value = totalRate;

// //     // Show the modal
// //     employeeModal.style.display = 'block';

// // }


// function deleteEmployeeRow(button) {
//     const row = button.parentNode.parentNode;
//     row.parentNode.removeChild(row);
// }


// function replaceMainContentWithTemplate() { 
//     const createNewTrackerBtn = document.getElementById('btn-create-new-tracker');
    
//     createNewTrackerBtn.addEventListener('click', function() {
//         const newProjectName = document.getElementById('newProjectName').value;
//         const newProjectDescription = document.getElementById('newProjectDescription').value;

//         let newProject = {
//             name: newProjectName,
//             description: newProjectDescription
//         };

//         // Get all the employee data from the table in function createNewTracker()
//         const employeeTable = document.querySelector('#employee-table tbody');
//         const employeeData = [];

//         // Loop through the table and get the data
//         for (let i = 0; i < employeeTable.rows.length; i++) {
//             employeeData.push({
//                 no: employeeTable.rows[i].cells[0].innerHTML,
//                 fullname: employeeTable.rows[i].cells[1].innerHTML,
//                 position: employeeTable.rows[i].cells[2].innerHTML,
//                 deployment: employeeTable.rows[i].cells[3].innerHTML,
//                 rate: employeeTable.rows[i].cells[4].innerHTML,
//                 totalRate: employeeTable.rows[i].cells[5].innerHTML
//             });
//         }

//         // Log to the console the tracker data
//         console.log(newProject);
//         console.log(employeeData);

//         // Fetch the template
//         fetch("../html/template-project-tracker.html")
//             .then((response) => response.text())
//             .then((template) => {
//                 if (template) {

//                     // Log the template after replacements
//                     console.log("Replaced template:", template);

//                     // Replace the template placeholder with the tracker data
//                     template = template.replace("project-name-placeholder", newProject.name);
//                     template = template.replace("project-description-placeholder", newProject.description);

//                     // Create a temporary DOM element to parse the template HTML
//                     const tempElement = document.createElement('div');
//                     tempElement.innerHTML = template;

//                     // Get the necessary scripts from the template
//                     const scripts = tempElement.querySelectorAll('script');

//                     // Get the employee table in the template
//                     const employeeListTableTemplate = tempElement.querySelector('#employee-list-table-template tbody');

//                     if (employeeListTableTemplate) {
//                         // Loop through the employee data and insert it into the template
//                         for (let i = 0; i < employeeData.length; i++) {
//                             const row = employeeListTableTemplate.insertRow(); // Create a new row

//                             // Insert cell data into the row
//                             row.insertCell().textContent = employeeData[i].no;
//                             row.insertCell().textContent = employeeData[i].fullname;
//                             row.insertCell().textContent = employeeData[i].position;
//                             row.insertCell().textContent = employeeData[i].deployment;
//                             row.insertCell().textContent = employeeData[i].rate;
//                             row.insertCell().textContent = employeeData[i].totalRate;
//                         }

//                         // Log the employee data to verify it
//                         console.log("Employee data:", employeeData);

//                         // Insert the template into the <main> tag
//                         const mainElement = document.querySelector('main');
//                         mainElement.innerHTML = tempElement.innerHTML;
//                     } else {
//                         console.error("Error: Employee table template not found.");
//                     }
//                 } else {
//                     console.error("Error: Template HTML not retrieved.");
//                 }
//             })
//             .catch((error) => {
//                 console.error("Error fetching or replacing content:", error);
//             });

//         // Reset the input fields: newProjectName and newProjectDescription
//         newProjectName.value = '';
//         newProjectDescription.value = '';

//         // Reset the employee table
//         employeeTable.innerHTML = '';

//         // Log to the console that the form was reset
//         console.log('Everything reset!');

//     });
// }