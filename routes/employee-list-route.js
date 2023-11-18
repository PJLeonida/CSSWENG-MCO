// Dashboard routing

const app = require('express')
const router = app.Router()
empCollection = require('../server/schema/Employees')

router.get('/get-list', async(req,res) =>{
    try {
        console.log('get-list GET');
        const employeeList = await empCollection.find().exec();
        console.log(employeeList);
        res.json(employeeList); // Send the array as JSON response
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' }); // Handle errors with a JSON response
    }
})

router.get('/', async (req, res) => {
    console.log("employee-list GET")
    res.render('employee-list');
})


module.exports = router