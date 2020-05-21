const mongoose = require('mongoose')
const colors = require('colors')
const { success, error } = require('consola')
const connectDB = async() => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useFindAndModify: false,
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: false
        });

        success({
            message: "Successfully connected with the Database".bold,
            badge: true
        });


    } catch (err) {
        error({
            message: "Unable to connect with Database".red,
            badge: true
        });
    }
};

module.exports = connectDB