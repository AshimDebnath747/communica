const mongoose = require("mongoose");
const { createHmac, randomBytes } = require('node:crypto');
const {tokenGenrator} = require("../utils/authentication")
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    userName : {
        type: String,
    },
    UserEmail: {
        type : String,
    },
    gender :   {
        type : String,
    } ,
    password : {
        type : String,
        
    },
    profileImage :{
        type : String,
        default : "/images/default.jpg"
    },
    community :[{
      type : mongoose.Schema.Types.ObjectId,
      ref : "community",
    }],
    role : {
        type : String,
        enum : ["USER","ADMIN"],
        default : "USER",
    },
    salt:{
        type : String,
    }
},{timestamps : true})

userSchema.pre("save",function(next){
    const user = this
    if (!user.isModified) return ;

    else{
   const salt = randomBytes(16).toString()
   const hashedPassword = createHmac("sha256",salt)
   .update(user.password).digest('hex')
   this.salt = salt
   this.password = hashedPassword

   next()
    }
})
userSchema.static("matchUser",async function(UserEmail,password){
    const user = await this.findOne({UserEmail});
    if (!user) throw new Error("user not found")
    const actualPassword = user.password ;
    const salt = user.salt;
    const givenPassword = createHmac("sha256",salt)
    .update(password).digest("hex");


    if (givenPassword !== actualPassword) {
       throw new Error("USER NOT FOUND!");
    }
    else{

        return tokenGenrator(user);
    }
})

const UserModel = mongoose.model("user",userSchema);

module.exports = UserModel;