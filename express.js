/*
    express.js
*/

// Third party modules
require('dotenv').config();
const port = process.env.PORT || 3000; // Use the value from .env or default to 3000


// Setting up express and handlebars
const express = require('express');
// const session = require('express-session');
// const cookieParser = require('cookie-parser');

const app = express();


// Set up JSON parser
const bodyParser = require('body-parser');
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true}));


// Setting up handlebars
const { engine } = require ('express-handlebars');
app.engine('hbs', engine({
    extname: 'hbs',
    //defaultView: 'default',
    //layoutsDir:'./views/layouts/',
    partialsDir: __dirname + '/views/partials/',
    helpers: {eq: function (v1, v2) {return v1 === v2; },} // Register helper function
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
const createNewTrackerRoute = require('./routes/create-new-tracker-route.js');
const employeeListRoute = require('./routes/employee-list-route.js');
const projectListRoute = require('./routes/project-list-route.js')
const accountSettingsRoute = require('./routes/account-settings-route.js');

/*============================================EXPRESS====================================================================*/ 

// Root route
app.get('/', (req, res) => {
    console.log("SUCCESS");
    res.render('index', {
        title: 'Login / Register',
        script: '/static/js/index.js',
        // style: '/static/css/index.css',
    });
})



app.get('/about-page', (req, res) => {
    res.render('about-page', {
        title: 'About Page',
        activePage: 'About page',
        style: '/static/css/about-page.css'
    }); 
});


// Set up JSON parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true}));

// Set up routes
app.use('/register', accountAuthenticationRoute);
app.use('/login', accountAuthenticationRoute);
app.use('/logout', accountAuthenticationRoute);
app.use('/landing-page', landingPageRoute);
app.use('/dashboard', dashboardRoute);
app.use('/create-new-tracker', createNewTrackerRoute);
app.use('/new-tracker', createNewTrackerRoute); 
app.use('/project-list', projectListRoute);
app.use('/employee-list', employeeListRoute);
app.use('/account-settings', accountSettingsRoute);

//======================Server Listen========================//




module.exports = app;