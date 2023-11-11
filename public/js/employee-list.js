/* Sample Employee Data */
const dataEmployees = [
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
];


function initializeEmployeeListTable() {
    const dataTable = document.querySelector('#employee-list-table');
    const tbody = dataTable.querySelector('#employee-list-tbody');

    dataEmployees.forEach(employee => {
        const row = tbody.insertRow();

        // Combine the first name, middle name, last name, and suffix
        const fullName = `${employee.firstName} ${employee.middleName} ${employee.lastName} ${employee.suffix}`;

        row.insertCell().textContent = employee.id;
        row.insertCell().textContent = fullName;
        row.insertCell().textContent = employee.projectName;
        row.insertCell().textContent = employee.position;
        row.insertCell().textContent = employee.deployment;
        row.insertCell().textContent = employee.rate;
        row.insertCell().textContent = employee.totalRate;
    });
}





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
