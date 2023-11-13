require('dotenv').config();
const port = process.env.PORT || 3000; // Use the value from .env or default to 3000

const express = require('express');
const { engine } = require('express-handlebars');
const mongoose = require('mongoose');
const connectToDB = require('./server/config/connect.js');
const accountAuthRouter = require('./routes/account-auth.js');

const run_exp = async () =>{
    // Setting up express and handlebars
    const exp = express();

    // Set up Mongoose connection
    await connectToDB.connect
    
    // Setting up handlebars
    exp.engine('hbs', engine({
        extname: 'hbs',
        //defaultView: 'default',
        //layoutsDir:'./views/layouts/',
        partialsDir: './views/partials/'
    }));

    exp.set('view engine', 'hbs');

    // Setting up the hb view directory
    exp.set("views", "./views")

    // Making the public folder static
    exp.use("/static", express.static('public'));

    // GET the route for index page
    exp.get('/', function (req, res) {
        res.render('index', { title: 'Project Tracker' });
    });



    /*============================================EXPRESS====================================================================*/ 

    

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
}

module.exports = {run_exp}



// express.js

// require('dotenv').config();
// const express = require('express');
// const exphbs = require('express-handlebars');
// const mongoose = require('mongoose');

// const exp = express();
// const port = process.env.PORT || 3000;

// // Connect to MongoDB
// const connectToDB = require('./server/config/connect.js');

// // Routes
// const accountAuthRouter = require('./routes/account-auth.js');
// exp.use('/', accountAuthRouter);

// // Export the express app
// module.exports = { exp, port, connectToDB };