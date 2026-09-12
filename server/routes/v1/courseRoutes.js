const { create, listCourse, courseDetails, updateCourse, deleteCourse } = require('../../controllers/courseController')
const authAdmin = require('../../middlewares/authAdmin')
const upload = require('../../middlewares/multer')

const courseRouter= require('express').Router()

courseRouter.post('/create',authAdmin,upload.single("image"),create)
courseRouter.get('/listcourses',listCourse)
courseRouter.get('/courseDetails/:courseId', courseDetails)
courseRouter.put('/update/:courseId',authAdmin,upload.single("image"), updateCourse)
courseRouter.delete('/delete/:courseId',authAdmin,deleteCourse)





module.exports= courseRouter
