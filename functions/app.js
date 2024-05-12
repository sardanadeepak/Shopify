const express = require("express");
const serverless = require("serverless-http");
const cors = require('cors')
const mongoose = require('mongoose')
const app = express();
app.use(cors());
app.use(express.json());

const rootRouter = require('./routes')

app.use("/.netlify/functions/app", rootRouter)

const connect = () => {
    try {
        mongoose.connect('mongodb+srv://admin:qtsGn7eNXcttU0zO@cluster0.9ekt417.mongodb.net/');
        console.log("Database Connected")
    }
    catch (err) {
        console.log(err.message)
    }
}
connect();

module.exports.handler = serverless(app);