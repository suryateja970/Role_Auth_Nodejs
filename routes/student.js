const express = require('express')
const router = express.Router();
const student = require('../models/users')
const { protect, authorize } = require('../middleware/auth')

const { getOneStudent, getStudent, updateStudent, deleteStudent, createStudent } = require('../controllers/student')
router.route('/student', student).get(protect, authorize("admin"), getStudent).post(createStudent)
router.route('/student/:id').get(getOneStudent).put(updateStudent).delete(deleteStudent)
module.exports = router