require('dotenv').config();

const mongoose = require('mongoose')
const port = process.env.PORT || 3000; // Use the value from .env or default to 3000
const server = require('./express.js');



// Reference app and BrowserWindow from 'electron
const { app, BrowserWindow } = require('electron');

// Import mongoose database operations from db folder and also the collections
const db_ops = require('./server/config/connect.js');
const EmpDeployment = require('./server/schema/EmpDeployment.js');
const Employees = require('./server/schema/Employees.js');
const Projects = require('./server/schema/Projects.js');
const Users = require('./server/schema/Users.js')


// Set up express server

server.listen(port, function(error) {
    if (error){
        console.log("Error: ", error)
    }
    else{
        console.log("Server is listening on port " + port)
    }
});



/*============================================Electron====================================================================*/ 

// Create a new window
function createWindow () {
    const win = new BrowserWindow({
        width: 1440,
        height: 1024,
    });

    // Load the file
    win.loadURL('http://localhost:' + port);

    // Maximize the window
    win.maximize();
}

// Check if App is ready
app.whenReady().then(() => {
    // Connet to the database
    db_ops.connect()
        .then(() => {
            console.log('Connected to database');
            // Create the window
            createWindow();
        })
        .catch((error) => {
            console.log('Error connecting to database:', error);
        });
});

// App listener when all the window is closed,
// closed the app completely
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
})

module.exports = port; // Export the port value


// const employee1 = new Employees({
//     firstName: "Sample",
//     lastName: "Document",
//     position: "Sampleposition",
//     rate: 50,
//     totalrate: 25000,
//     notes: "Sana gumana pls"
// })

// employee1.save()
//     .then(savedEmployee => {
//         console.log('New employee saved:', savedEmployee);
//     })
//     .catch(error => {
//         console.error('Error saving new employee:', error);
//     });