const mongoose = require('mongoose')
const studentSchema = new mongoose.Schema({
    sname: {
        type: String,
        required: true
    },
    sage: {
        type: Number,
        required: true
    },
    scourse: {
        type: String,
        required: true
    },
    scollege: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Student', studentSchema)