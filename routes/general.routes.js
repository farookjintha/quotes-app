const express = require('express');
const router = express.Router();

router.get('/hello', async (req, res) => {
    await res.status(200).send(`Hello! How are you?`);
});

module.exports = router;