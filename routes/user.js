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

module.exports = router;
