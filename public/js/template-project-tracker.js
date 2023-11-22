async function getEmployeeData() {
    try {
        const response = await fetch("/template-project-tracker/get-employee-list", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        if(response.status == 200){
            return await response.json()
        }else{
            console.error(`An error has occured. Status code = ${response.status}`);
            return { status: 'error', message: 'Error fetching data' };
        }
    } catch (error) {
        console.error(error);
        return {status: 'error', message: 'Error fetching data' };
    }
}

function initializeEmployeeListTable(empList) {
    //const dataTable = document.querySelector('#employee-list-table');
    const tbody = document.querySelector('#employee-list-tbody');
    var id = 0
    empList.forEach(employee => {
        const row = tbody.insertRow();

        const fullName = `${employee.firstName ?? ''} ${employee.middleName ?? ''} ${employee.lastName ?? ''} ${employee.suffix ?? ''}`;
        row.insertCell().textContent = id;
        row.insertCell().textContent = fullName;
        row.insertCell().textContent = employee.position;
        row.insertCell().textContent = employee.deployment;
        row.insertCell().textContent = employee.rate;
        row.insertCell().textContent = employee.totalRate;
        row.insertCell().innerHTML = '<button class="btn disabled btn-warning btn-sm btn-edit-employee" id="btn-edit-employee">Edit</button>';
        row.insertCell().innerHTML = '<button class="btn disabled btn-danger btn-sm btn-delete-employee" id="btn-delete-employee">Delete</button>';
        
        id += 1;
    });
}

document.addEventListener('DOMContentLoaded', async function (e) {
    e.preventDefault();

    // Call the function to get employee data
    const empList = await getEmployeeData();
    initializeEmployeeListTable(empList);
});


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