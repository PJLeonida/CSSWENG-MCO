require('dotenv').config();

const mongoose = require('mongoose')
const port = process.env.PORT || 3000; // Use the value from .env or default to 3000
const { run_exp } = require('./express.js');

run_exp();


// Reference app and BrowserWindow from 'electron
const { app, BrowserWindow } = require('electron');

// Import mongoose database operations from db folder and also the collections
// const db_ops = require('./server/config/connect.js');
const { connectToDB } = require('./server/config/connect.js');

const EmpDeployment = require('./server/schema/EmpDeployment.js');
const Employees = require('./server/schema/Employees.js');
const Projects = require('./server/schema/Projects.js');
const Users = require('./server/schema/Users.js')


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
    connectToDB()
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
