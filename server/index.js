const express= require('express')
const mongoose= require("mongoose")
const cors = require("cors")
require('dotenv').config()
const apiRouter = require('./routes')
const cookieparser= require('cookie-parser')

const app = express()

app.get('/', (req, res) => {
    res.json({ status: 'ok', service: 'learning-app-api' })
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieparser())

app.use(cors({
    origin:  'https://learnly-learnningapp-frontend.vercel.app/courses',
    credentials:true
}))

const connectToDatabase = async () => {
    if (mongoose.connection.readyState === 1) {
        return
    }

    await mongoose.connect(process.env.MONGO_URL, {
        serverSelectionTimeoutMS: 5000
    })
    console.log("Db connected successfully")
}

app.use('/api', async (req, res, next) => {
    try {
        await connectToDatabase()
        next()
    } catch (error) {
        console.error("Unable to connect to MongoDB:", error.message)
        res.status(503).json({ message: 'Database unavailable' })
    }
})

app.use("/api",apiRouter)

if (require.main === module) {
    connectToDatabase()
        .then(() => {
            app.listen(process.env.PORT || 4000, () => {
                console.log(`server starts on port ${process.env.PORT || 4000}`)
            })
        })
        .catch((error) => {
            console.error("Unable to connect to MongoDB:", error.message)
            process.exit(1)
        })
}

module.exports = app