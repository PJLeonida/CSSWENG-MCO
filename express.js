require('dotenv').config();
const port = process.env.PORT || 3000; // Use the value from .env or default to 3000

// Set up express and handlebars
const express = require('express');
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
    partialsDir: './views/partials/'
}));
app.set('view engine', 'hbs');

// Setting up the hb view directory
app.set("views", "./views")

// Making the public folder static
app.use("/static", express.static('public'));


// Set up routes from routes folder
const register = require('./routes/account-authentication.js');
const dashboard = require('./routes/dashboard.js');

/*============================================EXPRESS====================================================================*/ 

app.get('/', (req, res) => {
    console.log("SUCCESS");
    res.render('index');
})

app.use('/register', register);     // Register page and functionalities
app.use('/dashboard', dashboard);   // Dashboard page and functionalities



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



module.exports = app;