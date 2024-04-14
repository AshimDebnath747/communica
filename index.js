const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose")

//conncting yo server
 mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.5")
.then(()=>console.log("connected to mongodb"))
//set view engine to ejs
app.set("view engine","ejs")
//home page
app.get("/",(req,res)=>{
    res.render("home.ejs")
})
app.listen(port,()=>{
    console.log("server connected to port"+ port)
})