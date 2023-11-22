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