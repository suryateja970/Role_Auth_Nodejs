const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter a name"]
    },
    email: {
        type: String,
        required: [true, "please enter a email"],
        unique: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        required: [true, "please enter proper details"]
    },
    password: {
        type: String,
        select: false,
        required: [true, "please enter a Password"],

    },
    resetPasswordToken: String,
    resetPasswordExpiry: Date,
    CreatedAt: {
        type: Date,
        default: Date.now
    }
})

//encrypt password using bcrypt
userSchema.pre('save', async function(next) {
        const salt = await bcrypt.genSaltSync(10)
        this.password = await bcrypt.hash(this.password, salt)

    })
    //sign jwt and return
userSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY })

}

//match user entered password to hased passwrod in db

userSchema.methods.matchPassword = async function(enteredPassword) {


    return await bcrypt.compare(enteredPassword, this.password)

}

module.exports = mongoose.model('users', userSchema)