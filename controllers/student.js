const Student = require('../models/student')
exports.createStudent = (req, res, next) => {
    const student = Student.create(req.body)
    res.status(201).json({
        success: true,
        message: "student profile created",
        data: req.body
    })
}
exports.getStudent = async(req, res, next) => {
    const student = await Student.find()
    res.status(201).json({
        success: true,
        message: "students found",
        data: student
    })
}
exports.getOneStudent = async(req, res, next) => {
    const student = await Student.findById(req.params.id)
    res.status(201).json({
        success: true,
        message: "student profile created",
        data: student
    })
}
exports.updateStudent = async(req, res, next) => {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(201).json({
        success: true,
        message: "student  profile updated",
        data: req.body
    })
}
exports.deleteStudent = async(req, res, next) => {
    const student = await Student.findByIdAndDelete(req.params.id)
    res.status(201).json({
        success: true,
        message: "student deleted",

    })
}