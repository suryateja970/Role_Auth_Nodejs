const users = require('../models/users')
const { register, login } = require('../controllers/users')
const express = require('express')
const router = express.Router();
router.post('/register', register)
router.post('/login', login)
module.exports = router