/* New Tracker */
/*
    This allows the user to add a new employee using the answered form
    and add it to the table when creating a new tracker.
*/

// Path: src/js/employee.js

document.addEventListener('DOMContentLoaded', function() {
    const employeeForm = document.getElementById('employee-form');
    const employeeTable = document.querySelector('#employee-table tbody');

    employeeForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const employeeFirstName = document.getElementById('employeeFirstName').value;
        const employeeMiddleName = document.getElementById('employeeMiddleName').value;
        const employeeLastName = document.getElementById('employeeLastName').value;
        const employeeSuffix = document.getElementById('employeeSuffix').value;
        const employeePosition = document.getElementById('employeePosition').value;
        const employeeDeployment = document.getElementById('employeeDeployment').value;
        const employeeRate = document.getElementById('employeeRate').value;
        
        let employeeFullName = employeeFirstName + ' ' + employeeMiddleName + ' ' + employeeLastName + ' ' + employeeSuffix;
        let employeeTotalRate = employeeDeployment * employeeRate;

        const employee = {
            no: 1,
            fullname: employeeFullName,
            position: employeePosition,
            deployment: employeeDeployment,
            rate: employeeRate,
            totalRate: employeeTotalRate
        };

        employeeTable.innerHTML += `
            <tr>
                <td>${employee.no}</td>
                <td>${employee.fullname}</td>
                <td>${employee.position}</td>
                <td>${employee.deployment}</td>
                <td>${employee.rate}</td>
                <td>${employee.totalRate}</td>
            </tr>
        `;

        /* Reset the form */
        employeeForm.reset();
    });
});