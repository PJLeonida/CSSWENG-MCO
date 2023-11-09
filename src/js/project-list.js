/* Sample Project Data */
const dataProjects = [
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
];


function initializeProjectListTable() {
    const dataTable = document.querySelector('#project-list-table');
    const tbody = dataTable.querySelector('tbody');

    dataProjects.forEach(project => {
        const row = tbody.insertRow();

        row.insertCell().textContent = project.id;
        row.insertCell().textContent = project.title;
        row.insertCell().textContent = project.description;
        row.insertCell().textContent = project.numberOfEmployees;
        row.insertCell().textContent = project.totalDeploymentHours;
    });
}
