const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    userName : {
        type: String,
        required : true
    },
    UserEmail :  {
        type : String,
        required : true,
        unique : true,
    },
    gender : {
        type : String,
        required : true,
    } ,
    password : {
        type : String,
        required : true,
    },
    profileImage :{
        type : String,
        default : "/images/default.jpg"
    },
    role : {
        type : String,
        enum : ["USER","ADMIN"],
        default : "USER",
    }
},{timestamps : true})

const UserModel = mongoose.model("user",userSchema);

module.exports = UserModel;