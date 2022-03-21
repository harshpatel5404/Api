const express = require('express');
const Model = require('../models/model');

const router = express.Router();

router.post('/post', (req, res) => {
    const data = new Model({
        name: req.body.name,
        age: req.body.age
    })
    try {
        const dataToSave = data.save();
        res.status(200).json({ "Status": "Added Sucessfully...!" })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Get all Method
router.get('/get', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }

});


module.exports = router;
