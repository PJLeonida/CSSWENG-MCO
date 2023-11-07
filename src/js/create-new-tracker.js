/* New Tracker */
/*
    This allows the user to add a new employee using the answered form
    and add it to the table when creating a new tracker.
*/

// Path: src/js/employee.js

function initializeNewTracker() {
    const employeeForm = document.getElementById('employee-form');
    const employeeTable = document.querySelector('#employee-table tbody');

    if (employeeForm) {
        employeeForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const employeeFirstName = document.getElementById('employeeFirstName').value;
            const employeeMiddleName = document.getElementById('employeeMiddleName').value;
            const employeeLastName = document.getElementById('employeeLastName').value;
            const employeeSuffix = document.getElementById('employeeSuffix').value;
            const employeePosition = document.getElementById('employeePosition').value;
            const employeeDeployment = parseFloat(document.getElementById('employeeDeployment').value);
            const employeeRate = parseFloat(document.getElementById('employeeRate').value);

            let employeeFullName = employeeFirstName + ' ' + employeeMiddleName + ' ' + employeeLastName + ' ' + employeeSuffix;
            let employeeTotalRate = employeeDeployment * employeeRate;

            /* Log to the console the values */
            console.log(employeeFirstName);
            console.log(employeeMiddleName);
            console.log(employeeLastName);
            console.log(employeeSuffix);
            console.log(employeePosition);
            console.log(employeeDeployment);
            console.log(employeeRate);
            console.log(employeeFullName);
            console.log(employeeTotalRate);
            
            const employee = {
                no: employeeTable.rows.length + 1, // Auto-generate a unique ID
                fullname: employeeFullName,
                position: employeePosition,
                deployment: employeeDeployment,
                rate: employeeRate,
                totalRate: employeeTotalRate
            };

            const row = employeeTable.insertRow(); // Create a new row

            // Insert cell data into the row
            row.insertCell().textContent = employee.no;
            row.insertCell().textContent = employee.fullname;
            row.insertCell().textContent = employee.position;
            row.insertCell().textContent = employee.deployment;
            row.insertCell().textContent = employee.rate;
            row.insertCell().textContent = employee.totalRate;

            /* Reset the form */
            employeeForm.reset();

            /* Log to the console that the form was reset */
            console.log('Form reset!');
        });
    }
}

function createNewTracker() {
    const newTrackerForm = document.getElementById('new-tracker-form');
    const newTrackerTable = document.querySelector('#new-tracker-table tbody');

    if (newTrackerForm) {
        newTrackerForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const trackerName = document.getElementById('trackerName').value;
            const trackerDate = document.getElementById('trackerDate').value;
            const trackerDescription = document.getElementById('trackerDescription').value;

            let tracker = {
                name: trackerName,
                date: trackerDate,
                description: trackerDescription
            };

            const row = newTrackerTable.insertRow(); // Create a new row

            // Insert cell data into the row
            row.insertCell().textContent = tracker.name;
            row.insertCell().textContent = tracker.date;
            row.insertCell().textContent = tracker.description;

            /* Reset the form */
            newTrackerForm.reset();

            /* Log to the console that the form was reset */
            console.log('Form reset!');
        });
    }