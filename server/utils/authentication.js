const JWT = require("jsonwebtoken");

const secret = "Ashim@123";

function tokenGenrator(user){
   const payload = {
    "id" : user._id,
    "fullName" : user.userName,
    "profileImage" : user.profileImage
   }
   const token = JWT.sign(payload,secret,{
    expiresIn : "2h"
   })
   return token;
}
function validateToken(token){
    const payload = JWT.verify(token , secret)
    return payload;
}

module.exports = {
    tokenGenrator,
    validateToken
}