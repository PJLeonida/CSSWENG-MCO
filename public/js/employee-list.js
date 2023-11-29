
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

function resetTable(){
    const dataTable = document.querySelector('#employee-list-table');
    const tbody = dataTable.querySelector('#employee-list-tbody');
    var rowCount = tbody.rows.length;
    for (var i = rowCount-1; i >= 0; i--) {
        tbody.deleteRow(i);
    }
}

function searchEmployee(empList, employeeName){
    let employee  = empList.find(obj => obj['employee']  && obj['employee'].includes(employeeName));
    if(employee){
        return true;
    }
    return false;
}

function initializeEmployeeListTable(empList) {
    /*cant do this yet because there are null values
    empList.sort(function(a,b){
        return a.name.localeCompare(b.name);
    });*/
    
    const dataTable = document.querySelector('#employee-list-table');
    const tbody = dataTable.querySelector('#employee-list-tbody');
    var id = 1
    empList.forEach(employee => {
        const row = tbody.insertRow();

        row.insertCell().textContent = id;
        row.insertCell().textContent = employee.employee;
        row.insertCell().textContent = employee.project;
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

    document.getElementById('search-form').addEventListener('submit', async function(e) {
        e.preventDefault();
   
        employeeNameInput = document.getElementById('search-employee-input').value.toUpperCase();

        if(employeeNameInput == ""){
           return false;
        }
   
        let employeeExists = searchEmployee(empList, employeeNameInput)

        if(employeeExists){
          let filteredList = empList.filter(obj => obj['employee'] && obj['employee'].includes(employeeNameInput));
          resetTable()  
          initializeEmployeeListTable(filteredList)
          return true;
        }
        else{
           console.log("No employee found")
           return false;
        }
    })
});