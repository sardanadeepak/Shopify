const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(cors());
app.use(express.json());

const rootRouter = require("./routes");

app.use("/.netlify/functions/app", rootRouter);

const connect = () => {
  try {
    mongoose.connect(
      "mongodb+srv://mrajaysharma9:QRvDZBSzrv77299t@cluster0.mzl7o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );

    console.log("Database Connected");
  } catch (err) {
    console.log(err.message);
  }
};
connect();

//app.listen(3000);
//console.log("AI app listening on port 3000");
module.exports.handler = serverless(app);
