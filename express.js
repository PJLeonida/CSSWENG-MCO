/*
    express.js
*/

// Third party modules
require('dotenv').config();
const port = process.env.PORT || 3000; // Use the value from .env or default to 3000


// Setting up express and handlebars
const express = require('express');
const cookieParser = require('cookie-parser');


const app = express();

/************************ PASSPORT ***********************/
const User = require('./server/schema/Users.js')
const session = require('express-session')
const passport = require('passport')

/* Setup session manager and request authentication middleware */ 
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 10// 10hrs
    }
  }))
  
// initialize passport and make it deal with session
app.use(passport.initialize());
app.use(passport.session());

// Configure passport-local-mongoose
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// ========================================================

// Set up JSON parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

//setting up session
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveIniniialized: true,
    projectID: " ",
}));


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
const templateProjectTrackerRoute = require('./routes/template-project-tracker-route.js');

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
        pageTitle: 'About',
        // partial: 'about-page',
        activePage: 'About page',
        style: '/static/css/about-page.css'
    }); 
});


// Set up JSON parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// Set up middleware to handle requests to routes
app.use('/register', accountAuthenticationRoute);
app.use('/login', accountAuthenticationRoute);
app.use('/logout', accountAuthenticationRoute);
app.use('/landing-page', landingPageRoute);
app.use('/dashboard', dashboardRoute);
app.use('/create-new-tracker', createNewTrackerRoute);
app.use('/new-tracker', createNewTrackerRoute); 
app.use('/project-list', projectListRoute);
app.use('/employee-list', employeeListRoute);


//======================Server Listen========================//
app.use('/landing-page', verifyLogin, landingPageRoute);
app.use('/dashboard', verifyLogin, dashboardRoute);
app.use('/create-new-tracker', verifyLogin, createNewTrackerRoute);
app.use('/new-tracker', verifyLogin, createNewTrackerRoute); 
app.use('/project-list', verifyLogin, projectListRoute);
app.use('/employee-list', verifyLogin, employeeListRoute);
// app.use('/account-settings', verifyLogin, accountSettingsRoute);
app.use('/account-settings', verifyLogin, templateProjectTrackerRoute);
app.use('/template-project-tracker', verifyLogin, templateProjectTrackerRoute);
//======================Helper Functions========================//

// Middleware function to check if current user is logged in
function verifyLogin(req, res, next) {
    if (!req.user) {
        console.log('User not logged in!')
        res.render('index', {message: 'User not logged in'})
    } else {
         next();
    }
}




module.exports = app;
