const { register, login, logout } = require('../../controllers/adminController')


const adminRoutes= require('express').Router()

adminRoutes.post("/register",register)
adminRoutes.post("/login",login)
adminRoutes.post("/logout",logout)





module.exports= adminRoutes