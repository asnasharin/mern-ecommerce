const mongoose = require("mongoose")

 const connectDb = async () => {
    try {
         await mongoose.connect(process.env.MONGO_URI)
         console.log("database connected")
    } catch (error) {
        console.error("mongodb connection error")
        process.exit(1)
    }
}

module.exports = { connectDb };