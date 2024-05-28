const {Router} = require("express");
const communityModel = require("../models/community");
const router = Router();

router.get("/",(req,res)=>{
   return res.render("community",{
    user : req.user
   });
})
router.post("/",async(req,res)=>{
    const {name , description} = req.body;

    await communityModel.create({
        name : name,
        description : description,
        createdBy : req.user.id
    })

    return res.redirect("/")
})
router.get("/search",(req,res)=>{
    res.end("under development")
})
module.exports = router;
