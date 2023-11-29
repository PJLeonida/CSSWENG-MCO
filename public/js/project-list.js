/* Sample Project Data */
/*const dataProjects = [
    {
        id: 1,
        title: 'Project 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisi ac ultricies lacinia, magna enim aliquam augu',
        numberOfEmployees: 10,
        totalDeploymentHours: 1000,
    },
    {
        id: 2,
        title: 'Project 2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisi ac ultricies lacinia, magna enim aliquam augu',
        numberOfEmployees: 20,
        totalDeploymentHours: 2000,
    }
];*/


async function getProjectData() {
    try {
        const response = await fetch("/project-list/get-list", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        
        if(response.status == 200){
            console.log("Get Project list success");
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


async function searchProject(projectName){
    // Send AJAX request to server
    try{
        fetch('/project-list/searchProject/'+projectName, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
            }
        })

        if(response.status == 200){
            console.log("Get Project list success");
            return true
        }else{
            console.error(`Project not found ${response.status}`);
            return false;
        }

    } catch (error) {
        console.error(error);
        return false;
    }
}

function initializeProjectListTable(projlist) {
    /*cant do this yet because there are null values
    projlist.sort(function(a,b){
        return a.name.localeCompare(b.name);
    });*/
    const dataTable = document.querySelector('#project-list-table');
    const tbody = dataTable.querySelector('tbody');
    var id = 1
    projlist.forEach(project => {
        const row = tbody.insertRow();

       // row.insertCell().textContent = project.id;
        row.insertCell().textContent = id;

        // Create and attach an anchor tag with _id of project name
        const projectNameCell = row.insertCell();
        const projectNameLink = document.createElement('a');
        projectNameLink.textContent = project.name;
        projectNameLink.href = `/template-project-tracker/${project._id}`; // Set the href attribute to the desired link destination
        projectNameCell.appendChild(projectNameLink); // Append the anchor tag to the cell

        row.insertCell().textContent = project.location
        row.insertCell().textContent = project.description;
        row.insertCell().textContent = project.totalEmployees;
        row.insertCell().textContent = project.totalDeployment;
        row.insertCell().textContent = project.status;
        row.insertCell().textContent = project.startDate;
        row.insertCell().textContent = project.dueDate;


        id += 1;
    });
}


function resetTable(){
    const dataTable = document.querySelector('#project-list-table');
    const tbody = dataTable.querySelector('tbody');
    var rowCount = tbody.rows.length;
    for (var i = rowCount-1; i >= 0; i--) {
        tbody.deleteRow(i);
    }
}

function searchProject(projList, projectName){
    let project  = projList.find(obj => obj['name']  && obj['name'].includes(projectName));
    if(project){
        return true;
    }
    return false;
}

document.addEventListener('DOMContentLoaded', async function (e) {
    e.preventDefault();
    // Call the function to get project 
    const projlist = await getProjectData();
    initializeProjectListTable(projlist);

    document.getElementById('search-form').addEventListener('submit', async function(e) {
        e.preventDefault();
   
        projectNameInput = document.getElementById('search-project-input').value.toUpperCase();

        if(projectNameInput == ""){
           return false;
        }
   
        let projectExists = searchProject(projlist, projectNameInput)

        if(projectExists){
          let filteredList = projlist.filter(obj => obj['name'] && obj['name'].includes(projectNameInput));
          resetTable()  
          initializeProjectListTable(filteredList)
          return true;
        }
        else{
           console.log("No project found")
           return false;
        }
    })
});



