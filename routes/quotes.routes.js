const express = require('express');
const router = express.Router();
const quotes = require('../data');

//To Get all Qoutes
router.get('/quotes/all', async (req, res) => {
    await res.status(200).send({
        quotes: quotes
    })
});


//To Add a new Qoute
router.post('/quotes/add', async (req, res) => {
    const newQuote = req.body;
    console.log(newQuote);

    await quotes.push(newQuote);
    console.log('Quotes: ', quotes);
    await res.status(201).send({
        message: 'Quote has been published successfully.'
    })
});

//To Edit an exisiting Qoute
router.put('/quotes/:id/edit', async (req, res) => {
    const updatedContent = req.body;
    const index = quotes.findIndex(quote => quote.id === req.params.id);
    quotes[index] = updatedContent;
    console.log('Updated Quotes', quotes)
    await res.send({
        message: 'Quote has been updated successfully!'
    })
});

//To delete a Qoute
router.delete('/quotes/:id/delete', (req, res) => {
    const deleteId = req.params.id;

    const quotesAfterDeletion = quotes.filter(quote => quote.id !== deleteId);
    console.log('Quotes after Deletion: ', quotesAfterDeletion);
    res.send({
        message: 'Quotes has been deleted successfully.'
    })
});


module.exports = router;