require('dotenv').config();
const port = process.env.PORT || 3000; // Use the value from .env or default to 3000


// Setting up express and handlebars
const express = require('express');
const app = express();

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
/*============================================EXPRESS====================================================================*/ 

app.get('/', (req, res) => {
    console.log("SUCCESS")
    res.redirect('/login')
})

// Serve the login page
app.get('/login', (req, res) => {
    res.render('index');
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
app.get('/main', (req, res) => {
    console.log('Current working directory:', process.cwd());
    res.render("dashboard");
    console.log("Tried :C")
});
//======================Server Listen========================//




module.exports = app;