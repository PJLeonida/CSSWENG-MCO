require('dotenv').config();
const mongoose = require('mongoose')

// Setting up express and handlebars
const express = require('express');
const exp = express();
const port = 8080;

// Setting up handlebars
const { engine } = require ('express-handlebars');
exp.engine('handlebars', engine({
    extname: 'handlebars',
    //defaultView: 'default',
    //layoutsDir:'./views/layouts/',
   //partialsDir: './views/partials/'
}));
exp.set('view engine', 'handlebars');
//setting up the hb view directory
exp.set("views", "./views")

//making the src folder static
exp.use("/static", express.static('src'));

// Reference app and BrowserWindow from 'electron
const { app, BrowserWindow } = require('electron');

// Import mongoose database operations from db folder and also the collections
const db_ops = require('./server/config/connect.js');
const EmpDeployment = require('./server/schema/EmpDeployment.js');
const Employees = require('./server/schema/Employees.js');
const Projects = require('./server/schema/Projects.js');
const Users = require('./server/schema/User.js')


/*============================================Electron====================================================================*/ 

// Create a new window
function createWindow () {
    const win = new BrowserWindow({
        width: 1440,
        height: 1024
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
// clsed the app completely
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
})

db_ops.connect();

/*============================================EXPRESS====================================================================*/ 


exp.get('/', (req, res) => {
    console.log("SUCCESS")
    res.redirect('/login')
})

// Serve the login page
exp.get('/login', (req, res) => {
    res.render('index');
});


// NOTE: Login functionalities is pj's task 
exp.post('/login', (req, res) => {
    res.redirect('/main');
});

/*
        res.render("indexLogin", {
            title: "Login",
            script: "static/js/login.js",
            image: user.image,
    
            posts: searchCollection
        })
*/
// Serve the main page after successful login
exp.get('/main', (req, res) => {
    console.log('Current working directory:', process.cwd());
    res.render("dashboard");
    console.log("Tried :C")
});
//======================Server Listen========================//

exp.listen(port, function(error) {
    if (error){
        console.log("Error: ", error)
    }
    else{
        console.log("Server is listening on port " + port)
    }
});

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
