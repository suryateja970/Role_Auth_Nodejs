const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const colors = require('colors')
const dotenv = require('dotenv')
const morgan = require('morgan')
const { success, error } = require('consola')
const cookieParser = require('cookie-parser')
const app = express();
app.use(express())

dotenv.config({
    path: './config/config.env'
})
const userauth = require('./routes/users')
const student = require('./routes/student')
const protected = require('./middleware/auth')
const connectDb = require('./config/db')
app.use(express.json())
app.use(bodyParser.json())
app.use(cookieParser())
app.use(morgan())
morgan(function(tokens, req, res) {
        return [
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, 'content-length'), '-',
            tokens['response-time'](req, res), 'ms'
        ].join(' ')
    })
    // app.use('/', (req, res, next) => {
    //     res.status(200).json({
    //         message: "response from the server"
    //     })
    // })
app.use('/user', userauth)
app.use('/', student)
    // app.use('/login', userauth)
connectDb();
app.listen(process.env.PORT, async() => {
    try {
        await success({
            message: "server is running on port" + process.env.PORT.bgRed,
            badge: true
        })
    } catch (err) {
        error({
                message: "error raised",
                badge: true
            })
            // console.log(err);
    }
})