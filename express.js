/*
    express.js
*/

// Third party modules
require('dotenv').config();
const port = process.env.PORT || 3000; // Use the value from .env or default to 3000


// Setting up express and handlebars
const express = require('express');
const bodyParser = require('body-parser');
// const session = require('express-session');
// const cookieParser = require('cookie-parser');

const app = express();

// Setting up handlebars
const { engine } = require ('express-handlebars');
app.engine('hbs', engine({
    extname: 'hbs',
    //defaultView: 'default',
    //layoutsDir:'./views/layouts/',
    partialsDir: __dirname + '/views/partials/',
}));
app.set('view engine', 'hbs');

// Setting up the hb view directory
app.set('views', './views');

// Making the public folder static
app.use("/static", express.static('public'));


// Set up routes from routes folder
const accountAuthenticationRoute = require('./routes/account-authentication.js');   // Register and login
const landingPageRoute = require('./routes/landing-page-route.js');
const dashboardRoute = require('./routes/dashboard-route.js');
const employeeListRoute = require('./routes/employee-list-route.js');


/*============================================EXPRESS====================================================================*/ 

// Root route
app.get('/', (req, res) => {
    console.log("SUCCESS");
    res.render('index');
})

// Serve the login page
// app.get('/login', (req, res) => {
//     res.render('index');
// });

/*
        res.render("indexLogin", {
            title: "Login",
            script: "static/js/login.js",
            image: user.image,
    
            posts: searchCollection
        })
*/

// Set up JSON parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true}));

// Set up routes
app.use('/register', accountAuthenticationRoute);
app.use('/login', accountAuthenticationRoute);
app.use('/landing-page', landingPageRoute);
app.use('/dashboard', dashboardRoute);
app.use('/employee-list', employeeListRoute);

//======================Server Listen========================//




module.exports = app;