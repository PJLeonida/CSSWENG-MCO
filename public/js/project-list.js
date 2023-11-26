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
    console.log('Went to initializeProjectListTable')
    var id = 1
    projlist.forEach(project => {
        const row = tbody.insertRow();

       // row.insertCell().textContent = project.id;
        row.insertCell().textContent = id;

        // Create and attach an anchor tag with _id of project name
        const projectNameCell = row.insertCell();
        const projectNameLink = document.createElement('a');
        projectNameLink.textContent = project.projectName;
        projectNameLink.href = `/template-project-tracker/${project._id}`; // Set the href attribute to the desired link destination
        projectNameCell.appendChild(projectNameLink); // Append the anchor tag to the cell


        row.insertCell().textContent = project.projectName;
        row.insertCell().textContent = project.projectDescription;
        row.insertCell().textContent = project.numberOfEmployees;
        row.insertCell().textContent = project.totalDeploymentHours;

        id += 1;
    });
}

// async function get_projectID(projectname) {
//     try {
//         const projectID =  await Projects.findOne({ 'projectName': projectname })
//         if (!projectID) {
//             console.log('Project not found')
//         }
//         return projectID._id

//     } catch (error) {
//         // Handle any errors that occurred during the query
//         console.error('Error finding project:', error.message);
//         throw error;
//     }
// }

document.addEventListener('DOMContentLoaded', async function (e) {
    e.preventDefault();
    // Call the function to get project 
    const projlist = await getProjectData();
    initializeProjectListTable(projlist);
});