const run_exp = () =>{
//setting up express and handlebars
const express = require('express');
const exp = express();
const port = 8080;

//setting up handlebars
const { engine } = require ('express-handlebars');
exp.engine('handlebars', engine({
    extname: 'handlebars',
    //defaultView: 'default',
    //layoutsDir:'./views/layouts/',
    partialsDir: './views/partials/'
}));
exp.set('view engine', 'handlebars');
//setting up the hb view directory
exp.set("views", "./views")

//making the src folder static
exp.use("/static", express.static('src'));
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

}

module.exports = {run_exp}