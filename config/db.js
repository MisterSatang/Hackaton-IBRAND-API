const mongoose = require('mongoose');

const { DB_CONNECTION } = process.env;

exports.connect = () => {
    mongoose.connect(DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => {
            console.log("Sucessfully connected to database");
        })
        .catch((error) => {
            console.log("Error connecting to database");
            console.error(error);
            process.exit(1);
        });
};