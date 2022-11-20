const express = require('express');
const { updateQuote, addQuote, getQuoteByID, getAllQuotes, deleteQuote } = require('../controllers/quotes.controller');
const { getUserByID } = require('../controllers/user.controller');
const { requireSignIn, isAuth } = require('../utils/authenticationVerify');
const { isContentCreator } = require('../utils/roleBasedVerification');

const router = express.Router();


//To Get all Qoutes
router.get('/:userID/quotes/all',  requireSignIn, isAuth, getAllQuotes);

//To Get a quote using ID
router.get('/:userID/quotes/:quoteID',  requireSignIn, isAuth, getQuoteByID);

//To Add a new Qoute
router.post('/:userID/quotes/add',  requireSignIn, isAuth, isContentCreator, addQuote);

//To Edit an exisiting Qoute
router.put('/:userID/quotes/:id/edit', requireSignIn, isAuth, isContentCreator,updateQuote);

//To delete a Qoute
router.delete('/:userID/quotes/:id/delete',  requireSignIn, isAuth, isContentCreator, deleteQuote);

router.param('userID', getUserByID);

module.exports = router;