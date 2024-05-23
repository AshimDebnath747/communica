const {Router} = require("express");
const userModel = require("../models/user")
const router = Router();


router.get("/",async(req,res)=>{
    return res.render("profile",{
       user : req.user,

    });
})
router.get("/signup",(req,res)=>{
    return res.render("signup");
})
router.post("/signup",async(req,res)=>{
    const { userName , UserEmail , gender , password } = req.body;
     await userModel.create({
        userName ,
        UserEmail,
        gender,
        password,
     })
     return res.redirect("/");
})
router.get("/login",(req,res)=>{
    res.render("login")
 })
 router.post("/login",async(req,res)=>{
    const {UserEmail , password} = req.body;
    try{
    const token = await userModel.matchUser(UserEmail,password)
    res.cookie("token",token).redirect("/");
    }
    catch(err){
     res.render("login",{
         error : "incorrect email or password!",
     })
    }
})
    
module.exports = router;
