require('dotenv').config();
const port = process.env.PORT || 3000; // Use the value from .env or default to 3000

const express = require('express');
const exphbs = require('express-handlebars');
// Setting up express and handlebars
const exp = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { connectToDB } = require('./server/config/connect.js');


// Mount the account auth router
const accountAuthRouter = require('./routes/account-auth.js');


const run_exp = async () =>{
    // Body parser middleware to parse JSON and URL-encoded bodies
    exp.use(bodyParser.json());
    exp.use(bodyParser.urlencoded({ extended: true }));


    // Middleware
    // const accountAuthRouter = require('./routes/account-auth.js');
    exp.use('/', accountAuthRouter);
    


    // Set up Mongoose connection
    await connectToDB();

    
    // // exp.use(express.static(__dirname + '/public'));
    // exp.use("/static", express.static('public'));

    
    // Setting up the handlebars engine
    exp.engine('hbs', exphbs.engine({
        extname: 'hbs',
        partialsDir: './views/partials/'
    }));

    exp.set("view engine", "hbs");

    // Setting up the hb view directory
    exp.set("views", "./views")

    

    exp.listen(port, function(error) {
        if (error){
            console.log("Error: ", error)
        }
        else{
            console.log("Server is listening on port " + port)
        }
    });

    exp.get('/about', async(req, res) => {
        res.render('about', { title: 'About' });
    });


    exp.get('/', (req, res) => {
        res.render('index', { title: 'Project Tracker' });
    });

    exp.get('*', (req, res, next) => {
        console.log('Received a GET request: ' + req.url);
        next();
    });

    // exp.use(express.static(__dirname + '/public'));
    exp.use("/static", express.static('public'));
}

module.exports = { run_exp };
