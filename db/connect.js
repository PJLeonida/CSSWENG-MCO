const mongoose = require('mongoose')

const dburl = process.env.db_url ?? ""

const db_operations = {

    connect: async function () {
        await mongoose.connect(dburl, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });
        console.log('Connected to: ' + dburl);
    }

}

module.exports = db_operations;