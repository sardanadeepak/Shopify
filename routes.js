const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
router.get("/", async (req, res) => {
    const filepath = path.join(__dirname, './data.txt');
    fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) {
            return res.status(404).send('File not found');
        }
        res.json({
            message: 'Succccesss',
            value: data.split("\n")
        })
    });

})
module.exports = router;