const {Router} = require("express");
const communityModel = require("../models/community");
const router = Router();

router.get("/",(req,res)=>{
   return res.render("community");
})
router.post("/",(req,res)=>{
    const {name , description} = req.body;
    
})

module.exports = router;
