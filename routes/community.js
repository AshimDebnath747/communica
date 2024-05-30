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
router.get("/chat/:id",async(req,res)=>{
    const communityId = req.params.id
   
     res.render("chat.ejs",{
      chatCommunity : await communityModel.findOne({ _id : communityId }),
      user : req.user,
   })
})
router.get("/info/:id",async(req,res)=>{
    const id = req.params.id
    res.render("communityInfo",{
        user : req.user,
        community : await communityModel.findById({_id : id})
    })
})
module.exports = router;
