const User = require('../models/users')
exports.register = async(req, res, next) => {

    const { name, email, password, role } = req.body
    const user = await User.create({
        name,
        email,
        password,
        role
    })

    // const token = user.getSignedJwtToken();
    await sendTokenResponse(user, 200, res);



}

exports.login = async(req, res, next) => {
    const { email, password } = req.body
        //validateintig email
    if (!email && !password) {
        res.status(400).json({
            message: "please provide email and password"
        })
    }
    //check for user

    const userval = await User.findOne({ email }).select('+password')
    if (!userval) {
        res.status(401).json({
            message: "Invalid email"
        })
    }
    //check password macthes
    const isMatch = await userval.matchPassword(password);
    if (!isMatch) {
        res.status(401).json({
            message: "invalid password"
        })
    }
    //  const token = userval.getSignedJwtToken();
    await sendTokenResponse(userval, 200, res);
}

const sendTokenResponse = async(userval, status, res) => {
    const token = await userval.getSignedJwtToken();

    const options = {
        expires: await new Date(Date.now() + process.env.JWT_COOKIE_EXPIRY * 24 * 60 * 60 * 1000),
        httpOnly: true
    }
    res.status(status)
        .cookie('token', token, options).send({
            success: true,
            token
        })
}