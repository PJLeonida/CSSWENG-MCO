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

async function goToEditTracker(){
    const response = await fetch("/template-project-tracker/redirect-edit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        if (response.ok) {
            return response.json(); 
        } else {
            throw new Error('Failed to redirect to edit tracker');
        }
    })
    .then(data => {
        if (data.redirect) {
            window.location.href = data.redirect; // Redirect if the server sends a redirect URL
        } else {
            // Handle other data from the server if needed
        }
    })
}

function initializeEmployeeListTable(empList) {
    //const dataTable = document.querySelector('#employee-list-table');
    const tbody = document.querySelector('#employee-list-tbody');
    var id = 1
    empList.forEach(employee => {
        const row = tbody.insertRow();
        row.insertCell().textContent = id;
        row.insertCell().textContent = employee.employee;
        row.insertCell().textContent = employee.position;
        row.insertCell().textContent = employee.deploymentHrs;
        row.insertCell().textContent = employee.rate;
        row.insertCell().textContent = employee.totalRate;
        id += 1;
    });
}

document.addEventListener('DOMContentLoaded', async function (e) {
    e.preventDefault();

    // Call the function to get employee data
    const empList = await getEmployeeData();
    initializeEmployeeListTable(empList);

    // Get references to the buttons
    const editButton = document.getElementById('edit-tracker-btn');

    // const empEditBtn = document.documentElementId('btn-edit-employee');
    // const empDelBtn = document.documentElementId('btn-delete-employee');

    // Add event listener to the edit button
    editButton.addEventListener('click', function() {
        // Disable edit button
        editButton.disabled = true;
        editButton.style.color = '#FFFFFF';

        goToEditTracker()
        // // Enable edit and delete buttons in the employee list table
        // empEditBtn.disabled = false;
        // empEditBtn.style.color = '#000000';
        // empDelBtn.disabled = false;
        // empDelBtn.style.color = '#000000';

    });
});