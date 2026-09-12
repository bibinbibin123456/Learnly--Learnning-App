const cartDb = require("../Models/cartModel");
const courseDb = require("../Models/courseModel");

const getCart= async (req,res)=>{
    try {
        const userId= req.user
        const cart= await cartDb.findOne({userId}).populate("courses.courseId")
        console.log(cart);
        
        if(!cart){
            return res.status(200).json({ courses: [], totalPrice: 0 })
        }
        res.status(200).json(cart)
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({error:error.message || 'Internal server Error'})
    }
}

const removeFromCart = async (req, res) => {
    try {
        const userId = req.user
        const { courseId } = req.params

        if (!userId) {
            return res.status(401).json({ error: 'UserId is required' })
        }

        if (!courseId) {
            return res.status(400).json({ error: 'CourseId is required' })
        }

        const cart = await cartDb.findOne({ userId })

        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' })
        }

        const targetCourseId = courseId.toString()

        const existingCourse = cart.courses.find((item) => {
            const itemCourseId = item.courseId?._id ? item.courseId._id.toString() : item.courseId?.toString()
            return itemCourseId === targetCourseId
        })

        if (!existingCourse) {
            return res.status(404).json({ error: 'Course not found in cart' })
        }

        cart.courses = cart.courses.filter((item) => {
            const itemCourseId = item.courseId?._id ? item.courseId._id.toString() : item.courseId?.toString()
            return itemCourseId !== targetCourseId
        })

        cart.calculateTotalPrice()
        await cart.save()

        return res.status(200).json({
            message: 'Course removed from cart',
            cart
        })
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({ error: error.message || 'Internal server Error' })
    }
}

const addToCart= async(req,res)=>{
    try {
        const userId = req.user || req.body.userId

        if (!userId) {
            return res.status(401).json({ error: "UserId is required" })
        }

        const {courseId}= req.params

        const course=  await courseDb.findById(courseId)

        if(!course){
            return res.status(404).json({error:"course not found"})
        }

        let cart = await cartDb.findOne({userId})

        if(!cart){
            cart= new cartDb({userId,courses: [] })
        }
        const courseAlreadyExit= cart.courses.some((item)=>item.courseId.equals(courseId))

        if(courseAlreadyExit){
            return res.status(400).json({error:"course already in cart"})
        }

        cart.courses.push({
            courseId,
            price:course.price
        })

        cart.calculateTotalPrice()


        await cart.save()

        res.status(200).json({
           message: "added to cart",cart
        })
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({error:error.message || 'Internal server Error'})
        
        
    }
}
module.exports={
    addToCart,
    getCart,
    removeFromCart
}