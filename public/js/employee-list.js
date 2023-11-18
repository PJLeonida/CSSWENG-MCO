/* Sample Employee Data */
//1234567890

/*const dataEmployees = [
    {
        id: 1,
        firstName: 'John',
        middleName: 'Doe',
        lastName: 'Smith',
        suffix: 'Jr.',
        projectName: 'Project 1',
        position: 'Software Engineer',
        deployment: 100,
        rate: 1000,
        totalRate: 100000
    },
    {
        id: 2,
        firstName: 'Jane',
        middleName: 'Doe',
        lastName: 'Smith',
        suffix: 'Sr.',
        projectName: 'Project 2',
        position: 'Software Engineer',
        deployment: 200,
        rate: 2000,
        totalRate: 400000
    }
];*/

async function getEmployeeData() {
    try {
        const response = await fetch("/employee-list/get-list", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        
        if(response.status == 200){
            console.log("Get Employee list success");
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
    const dataTable = document.querySelector('#employee-list-table');
    const tbody = dataTable.querySelector('#employee-list-tbody');
    var id = 0
    empList.forEach(employee => {
        const row = tbody.insertRow();

        const fullName = `${employee.firstName ?? ''} ${employee.middleName ?? ''} ${employee.lastName ?? ''} ${employee.suffix ?? ''}`;
        row.insertCell().textContent = id;
        row.insertCell().textContent = fullName;
        row.insertCell().textContent = employee.projectName;
        row.insertCell().textContent = employee.position;
        row.insertCell().textContent = employee.deployment;
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
});



// if (dataTable) {
//     dataTable.addEventListener('click', function(event) {
//         if (event.target.classList.contains('btn-delete')) {
//             const row = event.target.parentElement.parentElement;
//             row.remove();
//         }
//     });
// }

// if (dataTable) {
//     dataTable.addEventListener('click', function(event) {
//         if (event.target.classList.contains('btn-delete')) {
//             const row = event.target.parentElement.parentElement;
//             const id = row.querySelector('td').textContent;
//             const url = `/api/employees/${id}`;
//             const options = {
//                 method: 'DELETE'
//             };

//             fetch(url, options)
//                 .then(response => response.json())
//                 .then(data => {
//                     row.remove();
//                 });
//         }
//     });
// }
