const express = require("express");
const {createServer} = require("http");
const {Server} = require("socket.io")
const app = express();
const server = createServer(app);
const io = new Server(server);
const connectDB = require("./db")
const port = 3000;
const userRoute = require("./routes/user")
const communityRoute = require("./routes/community")
const cookieParser = require("cookie-parser")
const {validateTokenAndSaveUserDetails} = require("./middlewares/authentication");
const community = require("./models/community");
//conncting your server
 connectDB();

app.use(express.json())
app.use(express.urlencoded({ extended : false}))
app.use(cookieParser())
app.use(validateTokenAndSaveUserDetails("token"))
app.use(express.static("./public"))
//set view engine to ejs
app.set("view engine","ejs")
//home page
app.get("/",async(req,res)=>{
     return res.render("home.ejs",{
       user : req.user,
        allCommunity : await community.find({})
    })
})

app.get("/profile/:id",async(req,res)=>{
    return res.render("profile",{
        userCommunity : await community.find({
            createdBy : req.params.id
        })
    })
    })
app.use("/user",userRoute);
app.use("/community",communityRoute );

//socket.io
io.on('connection',(socket)=>{
    console.log("user connected :",socket.id)
})
server.listen(port,()=>{
    console.log("server connected to port"+ port)
})

