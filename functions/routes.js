const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { Code } = require('./db');

router.get("/", async (req, res) => {
    return res.status(200)
})

router.post("/verifyCode", async (req, res) => {
    const code = req.body.redeemCode
    const filepath = path.resolve(__dirname + "/data.txt");
    fs.readFile(filepath, 'utf8', async (err, data) => {
        if (err) {
            console.log(err.message)
            return res.status(404).send('File Error');
        }
        const inputValues = data.split("\n").map(num => Number(num))

        if (inputValues.includes(code)) {
            const findCode = await Code.findOne({
                redeemCode: req.body.redeemCode
            })
            if (!findCode) {
                await Code.create({
                    redeemCode: req.body.redeemCode,
                    value: 1
                })
                return res.status(200).json({
                    value: true
                })
            }
            else {
                if (findCode.value < 3) {
                    await Code.updateOne({ _id: findCode._id }, { $inc: { value: 1 } })
                    return res.status(200).json({
                        value: true
                    })
                } else {
                    return res.status(404).json({
                        value: false
                    })
                }
            }
        } else {
            return res.status(404).json({
                value: false
            })
        }

    });

})

module.exports = router;