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

function initializeProjectListTable(projlist) {
    const dataTable = document.querySelector('#project-list-table');
    const tbody = dataTable.querySelector('tbody');
    var id = 1
    projlist.forEach(project => {
        const row = tbody.insertRow();

       // row.insertCell().textContent = project.id;
        row.insertCell().textContent = id;
        row.insertCell().textContent = project.projectName;
        row.insertCell().textContent = project.projectDescription;
        row.insertCell().textContent = project.numberOfEmployees;
        row.insertCell().textContent = project.totalDeploymentHours;

        id += 1;
    });
}

document.addEventListener('DOMContentLoaded', async function (e) {
    e.preventDefault();
    // Call the function to get project data
    const projlist = await getProjectData();
    initializeProjectListTable(projlist);
});