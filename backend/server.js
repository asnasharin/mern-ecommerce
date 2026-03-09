const express = require("express");
const { connectDb } = require("./src/config/mongoConnect");


const app = express();

require("dotenv").config()
app.use(express.json());

connectDb();

app.get("/", (req, res) => {
    res.send("api is running")
});

app.listen(process.env.PORT, () => {
    console.log("server is running")
});