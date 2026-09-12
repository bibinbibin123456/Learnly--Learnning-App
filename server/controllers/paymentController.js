const Stripe = require('stripe')

const stripe = new Stripe(process.env.STRIPE_SECRET)

const paymentFunction = async (req, res) => {
    try {
        const { products } = req.body

        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ error: 'Cart is empty' })
        }

        const lineItems = products.map((product) => {
            const course = product.courseId
            const price = Number(product.price ?? course?.price)

            if (!course?.title || !Number.isFinite(price) || price <= 0) {
                throw new Error('Invalid cart item')
            }

            return {
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: course.title,
                        ...(course.image ? { images: [course.image] } : {})
                    },
                    unit_amount: Math.round(price * 100)
                },
                quantity: 1
            }
        })

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/payment/success`,
            cancel_url: `${process.env.FRONTEND_URL}/payment/failed`
        })

        res.status(200).json({ success: true, sessionId: session.id, checkoutUrl: session.url })
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({ error: error.message || 'Internal server error' })
    }
}

module.exports = {
    paymentFunction
}