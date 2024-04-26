const {Router} = require("express");
const router = Router();

router.get("/community",(req,res)=>{
    res.render("community");
})

