const Quotes = require('../model/quotes.model');


exports.getAllQuotes = async (req, res) => {
    try{
        Quotes.find((err, quotes) => {
            if(err){
                res.status(400).send({
                    code: 400,
                    error: 'Error while getting Quotes'
                })
            }
            if(quotes){
                res.status(200).send({
                    quotes: quotes
                })
            }
        })
    }catch(err){
        res.status(500).send({
            error: err
        })
    }
}

exports.getQuoteByID = async (req, res) => {
    try{
        Quotes.findOne({_id: req.params.quoteID},(err, quote) => {
            if(err){
                res.status(400).send({
                    code: 400,
                    error: 'Error while getting Quotes'
                })
            }
            if(quote){
                res.status(200).send({
                    quote: quote
                })
            }
        })
    }catch(err){
        res.status(500).send({
            error: err
        })
    }
}

exports.addQuote = async (req, res) => {
    try{
        let quote = new Quotes(req.body);
        quote.save((err, data) => {
            if(err){
                res.status(400).send({
                    code: 400,
                    error: 'Error while adding Quotes'
                })
            }
            if(res){
                res.status(201).send({quote: data})
            }
        })

    }catch(err){
        res.status(500).send({
            error: err
        })
    }
}

exports.updateQuote = async (req, res) => {
    try{
        Quotes.findOneAndUpdate({_id: req.params.id}, {$set: req.body},
            (err, quote) => {
                if(err){
                    return res.status(400).json({
                        error: "Error while updating quote"
                    });
                }
    
                return res.status(201).json(quote);
            });
    }catch(err){
        return res.status(500).send("Internal Server Error")
    }
}

exports.deleteQuote = (req, res) => {
    try{
        Quotes.deleteOne({_id: req.params.id},
            (err, quote) => {
                if(err){
                    return res.status(400).json({
                        error: "Error while deleting quote"
                    });
                }
    
                return res.status(200).send("Quote Deleted Successfully...");

            });
    }catch(err){
        return res.status(500).send("Internal Server Error")
    }
}