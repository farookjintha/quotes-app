exports.isAdmin = (req, res, next) => {
    try{
        console.log("Req.Profile: ", req.profile)
        if(req.profile.role !== 1){
            return res.status(401).send({message: 'Admin Resource! Access denied.'})
        }

        next();
    }catch(error){
        res.status(500).send({
            message: 'Internal Server Error'
        })
    }
}

exports.isContentCreator = (req, res, next) => {
    try{
        console.log("Req.Profile: ", req.profile)
        if(req.profile.role !== 2){
            return res.status(401).send({message: 'Content Creator Resource! Access denied.'})
        }

        next();
    }catch(error){
        res.status(500).send({
            message: 'Internal Server Error'
        })
    }
}