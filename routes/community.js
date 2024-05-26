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

    res.redirect("/")
})

module.exports = router;
