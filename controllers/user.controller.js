const Users = require('../model/user.model');


exports.getUserByID = (req, res, next, userID) => {
    try{
        Users.findOne({_id: userID}, (err, data) => {
            if(err){
                return res.status(400).send({message: 'Error while getting an user.'})
            }

            req.profile = data;
            next();
        })
    }catch(err){
        res.status(500).send({message: 'Internal Server Error'});
    }
}


exports.getAllUsers = async (req, res) => {
    try{
        Users.find((err, data) => {
            if(err){
                return res.status(400).send({message: 'Error while getting all users.'})
            }

            res.status(200).send(data);
        })
    }catch(err){
        res.status(500).send({message: 'Internal Server Error'});
    }
}

exports.updateUser = async (req, res) => {
    try{
        if(req.profile._id === req.params.updateUserID){
            Users.findByIdAndUpdate({_id: req.params.updateUserID}, {$set: req.body}, (err, data) => {
                if(err){
                    return res.status(400).send({message: 'Error while updating user.'})
                }
    
                return res.status(201).send({userID: data._id, message: 'User has been updated successfully'});
            })
        }

        res.status(401).send({message: 'Cannot update user details'}) 
        
    }catch(err){
        res.status(500).send({message: 'Internal Server Error'});
    }
}


exports.deleteUser = async (req, res) => {
    try{
        Users.deleteOne({_id: req.params.deleteUserID}, (err, data) => {
            if(err){
                return res.status(400).send({message: 'Error while deleting user.'})
            }

            res.status(201).send({message: 'User has been deleted successfully'});
        })
    }catch(err){
        res.status(500).send({message: 'Internal Server Error'});
    }
}