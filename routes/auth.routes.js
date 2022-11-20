const express = require('express');
const req = require('express/lib/request');
const router = express.Router();

//Importing all controller
const { register, logIn, logOut } = require('../controllers/auth.controller');
const userModel = require('../model/user.model');


router.post('/register', register) 

router.post('/login', logIn)

router.get('/logout', logOut);



//Password Reset
// Route 1
// router.post('/reset-password');
    // req.body= {email: 'zyz@gmai.com'}
    // user exists or not

    // if user exists
        // token exists or not by USERID
        // if(!token) generate new token usng crypto package
        // if token exists, use that token
    // send email with token using NodeMailer.


// Route 2
    // router.post('/verify/:userID/:token');
    // if(user exists or not){
        // user = Users.findOne({_id: req.params.userID})
        // req.body = {password: 'Welcome123'}
        // newPassword = bcrypt.hash(passowrd, 15)
        // user.hashedPassword =  newPassword;
            // Users.findByIdandUpate({_id: req.params.userID}, {$set: user}, (err, data) => {})
        // }

// 

module.exports = router;