const express = require('express');
const { getAllUsers, getUserByID, updateUser, deleteUser } = require('../controllers/user.controller');
const { requireSignIn, isAuth } = require('../utils/authenticationVerify');
const { isAdmin } = require('../utils/roleBasedVerification');

const router = express.Router();

router.get('/:userID/users', getAllUsers);

router.put('/:userID/users/:updateUserID', requireSignIn, isAuth, updateUser);

router.delete('/:userID/users/:deleteUserID', requireSignIn, isAuth, isAdmin, deleteUser)

router.param('userID', getUserByID);

module.exports = router;