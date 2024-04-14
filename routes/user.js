const {Router} = require("express");
const userModel = require("../models/user")
const router = Router();


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
