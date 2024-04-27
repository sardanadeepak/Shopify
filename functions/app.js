const express = require("express");
const serverless = require("serverless-http");
const cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());

const rootRouter = require('../routes')

app.use("/.netlify/functions/app", rootRouter)

module.exports.handler = serverless(app);