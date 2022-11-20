const express = require('express');
const router = express.Router();

//Importing all controller
const { register, logIn, logOut } = require('../controllers/auth.controller');


router.post('/register', register) 

router.post('/login', logIn)

router.get('/logout', logOut)

module.exports = router;