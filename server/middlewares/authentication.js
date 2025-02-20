const {validateToken} = require("../server/utils/authentication")
const JWT = require("jsonwebtoken")

function validateTokenAndSaveUserDetails(token){
    return (req,res,next)=>{
        const cookie = req.cookies[token];
        if(!cookie){
           return next()
        }
        try{
    const payload = validateToken(cookie)
    req.user = payload;
    }
    catch(err){
       return next()
    }
    return next()
}
}

module.exports = {
    validateTokenAndSaveUserDetails,
}