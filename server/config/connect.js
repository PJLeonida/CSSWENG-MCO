const mongoose = require('mongoose')

const db_url = process.env.DB_URL ?? ""

const db_operations = {

    connect: async function () {
        await mongoose.connect(db_url, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });
        console.log('Connected to: ' + db_url);
    }

}

module.exports = db_operations;