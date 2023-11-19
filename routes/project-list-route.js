/*
    Project List routing
*/

const app = require('express');
const router = app.Router();
projCollection = require('../server/schema/Projects')

router.get('/get-list', async(req,res) =>{
    try {
        console.log('get-list GET');
        const projList = await projCollection.find().exec();
        console.log(projList);
        res.json(projList); // Send the array as JSON response
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' }); // Handle errors with a JSON response
    }
})

router.get('/', async (req, res) => {
    /*Get the right information in the db to here*/
    
    res.render('project-list');
})

module.exports = router;