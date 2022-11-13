const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const Users = require('../model/user.model');


router.post('/register', async (req, res) => {
    try{
        const payload = req.body;
        const hashValue = await bcrypt.hash(payload.password, 15);
        payload.hashedPassword = hashValue;
        delete payload.password;

        let user = new Users(payload);

        await user.save((err, data) => {
            if(err){
                console.log(err.errors.name)
                if(err.errors.name){
                        return res.status(400).send({message: `${err.errors.name}` });
                }
                if(err.code === 11000){
                    if(err.keyValue.email){
                        return res.status(400).send({message: "User with this email already exists."});
                    }
                }
                return res.status(400).send({message: "User registration failed."});
            }

            res.status(201).send({id : data._id, message: "User registration successfull"})

        })

    }catch(err){
        res.status(500).send({
            message: 'Internal Server Error'
        });
    }
}) 

router.post('/login', async (req, res) => {
    try{
        const payload = req.body; //email and password

        const existingUser = await Users.findOne({email: payload.email}) // to check whether user exists or not

        if(existingUser){
            const isMatching  = await bcrypt.compare(payload.password, existingUser.hashedPassword);

            if(isMatching){
                // jwt -> jsonwebtoken
                const token = jwt.sign({_id: existingUser._id}, process.env.SECRET_KEY); //Encryption -> method

                res.cookie('entryToken' , token, {expire: new Date() + 9999});

                return res.status(200).send({token: token, user: {id: existingUser._id, email: existingUser.email}})
            }
            
            return res.status(400).send({message: 'Username/Password are not matching'})
        }

        res.status(400).send({message: 'User not found'})

    }catch(err){
        res.status(500).send({
            message: 'Internal Server Error'
        });
    }

})

router.get('/logout', (req, res) => {

})

module.exports = router;