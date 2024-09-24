const express = require('express');

const router = express.Router();

router.get('/getItems', (req, res) => async function name() {
    res.json(['banana', "strawberry", 'apple']);
});

module.exports = router;