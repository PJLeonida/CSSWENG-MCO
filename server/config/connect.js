// const mongoose = require('mongoose')

// const dburl = process.env.MONGODB_URI ?? ""

// const db_operations = {

//     connect: async function () {
//         await mongoose.connect(dburl, { 
//             useNewUrlParser: true, 
//             useUnifiedTopology: true
//         });
//         console.log('Connected to: ' + dburl);
//     }

// }

// module.exports = db_operations;

const mongoose = require('mongoose')

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
        console.log('Connected to MongoDB: ' + process.env.MONGODB_URI);
    } catch (error) {
        console.log(error)
    }

    // Disconnection from the database
    mongoose.connection.on('disconnected', () => {
        console.log('Disconnected from MongoDB');
    });

    // Handling process termination
    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('Connection to MongoDB terminated');
            process.exit(0);
        });
    });
}

module.exports = { connectToDB };