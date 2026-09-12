const { addToCart, getCart, removeFromCart } = require('../../controllers/cartController')
const authUser = require('../../middlewares/authUser')

const cartRouter = require('express').Router()

cartRouter.post('/addtocart/:courseId', authUser, addToCart)
cartRouter.get('/getcart', authUser, getCart)
cartRouter.post('/getcart', authUser, getCart)
cartRouter.delete('/remove/:courseId', authUser, removeFromCart)

module.exports = cartRouter