const jwt = require('jsonwebtoken')
const user = require('../models/users')

exports.protect = async(req, res, next) => {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = await req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            res.status(400).json({
                message: "error",
                success: false
            })
        }
        console.log(token)
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded)
        req.user = await user.findById(decoded.id);
        next();
    }
    // for checking the rolwww
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.send("not authorized" + req.user.role)
        }
        next();
    }

}