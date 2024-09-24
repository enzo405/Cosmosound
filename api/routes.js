import express from 'express';

const router = express.Router();

router.get('/api', (req, res) => {
    res.json(['banana', "strawberry", 'apple']);
});

module.exports = router;