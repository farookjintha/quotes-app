const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const Users = require('../model/user.model');


router.post('/register', async (req, res) => {
    try{
        const payload = req.body;
        // payload = {
        //     name: 'Farook',
        //     email: 'farook@gmail.com',
        //     password: 'Welcome123',
        //     mobileNumber: '8756543224567',
        //     role: 1
        // }
        if(!payload.password){
            return res.status(400).send({message: 'Password required.'})
        }
        const hashValue = await bcrypt.hash(payload.password, 15);
        payload.hashedPassword = hashValue;
        
        delete payload.password;

         // payload = {
        //     name: 'Farook',
        //     email: 'farook@gmail.com',
        //     hashedPassword: '@#$@r$%FSfgsgEGrgevwcwdc23$%@$',
        //     mobileNumber: '8756543224567',
        //     role: 1
        // }

        let user = new Users(payload);

        await user.save((err, data) => {
            if(err){
                console.log(err);
                if(err.errors){
                        return res.status(400).send({message: `${JSON.stringify(err.errors)}` });
                }
                if(err.code === 11000){
                    if(err.keyValue.email){
                        return res.status(400).send({message: "User with this email already exists."});
                    }
                }
                return res.status(400).send({message: "User registration failed."});
            }

            return res.status(201).send({id : data._id, message: "User registration successfull"})

        })

    }catch(err){
        res.status(500).send({
            message: 'Internal Server Error'
        });
    }
}) 

router.post('/login', async (req, res) => {
    // 1.User existing or not
    // 2.User password matching or not
        // 2.1  -> accessToken genertion while password matching and setting cookie
        // 2.2 -> error while password not matching
    //3. Internal Server Error

    // JSON Web Token -> JSON value to some random string  -> encrpytion/decrytion

    try{
        const {email, password} = req.body;
        const existingUser = await Users.findOne({email: email});

        if(existingUser){
            const isCredentialsValid = await bcrypt.compare(password, existingUser.hashedPassword); //true or false

            if(isCredentialsValid === true){
                const token = jwt.sign({_id: existingUser._id}, process.env.SECRET_KEY);
                res.cookie('accessToken', token, {expire: new Date() + 86400000} ); //cookies for server as well as client

                const {_id, email} = existingUser;

                return res.status(200).send({userId: _id, email: email, message: "User logged in successfully."})

            }

            return res.status(400).send({message: 'Username/Password are not matching.'})

        }

        return res.status(400).send({message: "User doesn't exist."})


    }catch(err){
        res.status(500).send({
            message: 'Internal Server Error'
        });
    }

})

router.get('/logout', async (req, res) => {
    try{
        await res.clearCookie('accessToken');
        return res.status(200).send({ message: 'User logged out successfully.'})

    }catch(err){
        res.status(500).send({message: 'Internal Server Error'});
    }
})

module.exports = router;