const { register, login, logout } = require('../../controllers/userControllers')

const userRouter= require('express').Router()

userRouter.post('/register',register)
userRouter.post('/login',login)
userRouter.post('/logout',logout)




module.exports= userRouter