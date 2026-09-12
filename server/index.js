const express= require('express')
const mongoose= require("mongoose")
const cors = require("cors")
require('dotenv').config()
const apiRouter = require('./routes')
const cookieparser= require('cookie-parser')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieparser())

app.use(cors({
    origin:`http://localhost:5173`,
    credentials:true
}))

app.use("/api",apiRouter)

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            serverSelectionTimeoutMS: 5000
        })
        console.log("Db connected succesfully")

        app.listen(process.env.PORT, () => {
            console.log(`server starts on port ${process.env.PORT} `)
        })
    } catch (error) {
        console.error("Unable to connect to MongoDB:", error.message)
        process.exit(1)
    }
}

startServer()