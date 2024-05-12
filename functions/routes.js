const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { Code } = require('./db');
router.get("/", async (req, res) => {
    const filepath = path.resolve(__dirname + "/data.txt");
    console.log("AI : " + filepath)
    fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) {
            console.log(err.message)
            return res.status(404).send('File Error');
        }
        res.json({
            values: data.split("\n").map(num => Number(num))
        })
    });

})

router.post("/verifyCode", async (req, res) => {

    const findCode = await Code.findOne({
        redeemCode: req.body.redeemCode
    })
    if (!findCode) {
        const code = await Code.create({
            redeemCode: req.body.redeemCode,
            value: 0
        })
        return res.status(200).json({
            value: code
        })
    }
    else {
        const updatedCode = await Code.findOneAndUpdate({ _id: findCode._id }, { $inc: { value: 1 } }, { new: true })
        return res.status(200).json({
            value: updatedCode
        })
    }
})

module.exports = router;