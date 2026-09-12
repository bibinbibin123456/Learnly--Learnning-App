const mongoose= require('mongoose')


const cartSchema= new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"users",
        required:true
    },
    courses:[
        {
            courseId:{
                 type:mongoose.Types.ObjectId,
                ref:"courses",
                required:true

            },
            price:{
                type:Number,
                required:true
            }
        }
    ],
    totalPrice:{
        type:Number,
        required:true,
        default:0
    }

})

cartSchema.methods.calculateTotalPrice = function () {
    this.totalPrice = this.courses.reduce((total, course) => total + (Number(course.price) || 0), 0)
    return this.totalPrice
}

module.exports= new mongoose.model('carts',cartSchema)