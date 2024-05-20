const express = require("express");
const {createServer} = require("http");
const {Server} = require("socket.io")
const app = express();
const server = createServer(app);
const io = new Server(server);
const port = 3000;
const mongoose = require("mongoose")
const userRoute = require("./routes/user")
const cookieParser = require("cookie-parser")
const {validateTokenAndSaveUserDetails} = require("./middlewares/authentication");
const community = require("./models/community");

//conncting yo server
 mongoose.connect("mongodb://127.0.0.1:27017/communica")
.then(()=>console.log("connected to mongodb"))

app.use(express.json())
app.use(express.urlencoded({ extended : false}))
app.use(cookieParser())
app.use(validateTokenAndSaveUserDetails("token"))
//set view engine to ejs
app.set("view engine","ejs")
//home page
app.get("/",async(req,res)=>{
    res.render("home.ejs",{
        user : req.user,
        allCommunity : await community.find({})
    })
})
app.use("/user",userRoute);


//socket.io
io.on('connection',(socket)=>{
    console.log("user connected :",socket.id)
})
server.listen(port,()=>{
    console.log("server connected to port"+ port)
})

