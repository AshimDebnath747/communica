const {Router} = require("express");
const userModel = require("../models/user")
const router = Router();



router.get("/",(req,res)=>{
    return res.render("profile");
})
router.get("/signup",(req,res)=>{
    return res.render("signup");
})
router.post("/signup",async(req,res)=>{
    const { userName , userEmail , gender , password } = req.body;
     await userModel.create({
        userName ,
        userEmail,
        gender,
        password,
     })
     return res.redirect("/");
})
router.get("/login",(req,res)=>{
    res.render("login")
 })
 router.post("/login",async(req,res)=>{
    const {email , password} = req.body;
    try{
    const token = await User.matchUser(email,password)
     
    res.cookie("token",token).redirect("/");
    }
    catch(err){
     res.render("login",{
         error : "incorrect email or password!",
     })
    }
})
    
module.exports = router;
