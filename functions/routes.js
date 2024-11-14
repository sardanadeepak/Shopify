const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { Code } = require("./db");
const { UserSchema } = require("./user-model");

router.get("/", async (req, res) => {
  return res.status(200);
});

router.post("/verifyCode", async (req, res) => {
  const code = req.body.redeemCode;
  const email = req.body.email;
  const phone = req.body.phone;
  const filepath = path.resolve(__dirname + "/codes.txt");

  await UserSchema.create({
    email: email,
    phone: phone,
    code: code,
    createdOn: new Date().toISOString(),
  });

  fs.readFile(filepath, "utf8", async (err, data) => {
    if (err) {
      console.log(err.message);
      return res.status(404).send("File Error");
    }
    const inputValues = data
      .split(",")
      .map((num) => num.replaceAll('"', "").trim());

    if (inputValues.includes(code)) {
      const findCode = await Code.findOne({
        redeemCode: req.body.redeemCode,
      });
      if (!findCode) {
        await Code.create({
          redeemCode: req.body.redeemCode,
          value: 1,
        });
        return res.status(200).json({
          value: true,
        });
      } else {
        if (findCode.value < 3) {
          await Code.updateOne({ _id: findCode._id }, { $inc: { value: 1 } });
          return res.status(200).json({
            value: true,
          });
        } else {
          return res.status(400).json({
            value: false,
            message: "Code expired",
          });
        }
      }
    } else {
      return res.status(400).json({
        value: false,
        message: "Unable to validate code",
      });
    }
  });
});

module.exports = router;
