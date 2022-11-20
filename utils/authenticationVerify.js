const { expressjwt } = require('express-jwt');

//Decrypting the jwt
exports.requireSignIn = expressjwt({
    secret: process.env.SECRET_KEY,
    algorithms: ['HS256'],
    userProperty: 'auth'
})

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth._id === req.profile.userID;

    if(!user){
        return res.status(401).send({message: "Access Denied!"})
    }

    next();

}