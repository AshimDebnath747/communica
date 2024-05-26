const {Router} = require("express");
const userModel = require("../models/user")
const communityModel = require("../models/community")
const multer  = require('multer')
const path = require("path")
const Storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'./public/uploads/')
    },
    filename: function(req,file,cb){
        const fileName = `${Date.now()} - ${file.originalname}`;
        cb(null,fileName)
    }
})
const upload = multer({storage : Storage})
const router = Router();


router.get("/",async(req,res)=>{
    return res.render("profile",{
       user : req.user,

    });
})
router.get("/signup",(req,res)=>{
    return res.render("signup");
})
router.post("/signup",upload.single("profileImage"),async(req,res)=>{
    const profileImage = `/uploads/${req.file.filename}`
    const { userName , UserEmail , gender , password } = req.body;
     await userModel.create({
        userName ,
        UserEmail,
        gender,
        profileImage,
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
router.get("/:id",async(req,res)=>{
    res.render("profile",{
        userCommunity : await communityModel.find({
            createdBy : req.params.id
        })
    })
    })
module.exports = router;
