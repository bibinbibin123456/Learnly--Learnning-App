const adminRoutes = require('./adminRoutes')
const courseRouter = require('./courseRoutes')
const userRouter = require('./userRouter')
const cartRouter= require('./cartRoutes')
const paymentRouter = require('./paymentRoutes')

const V1Router= require('express').Router()

V1Router.use('/user',userRouter)
V1Router.use('/admin',adminRoutes)
V1Router.use('/course',courseRouter)
V1Router.use('/cart',cartRouter)
V1Router.use('/payment',paymentRouter)



module.exports= V1Router