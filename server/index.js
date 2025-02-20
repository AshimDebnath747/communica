const express = require("express");
const {createServer} = require("http");
const {Server} = require("socket.io")
const app = express();
const server = createServer(app);
const io = new Server(server,{
});
const connectDB = require("./db")
const port = 3000;
const userRoute = require("./routes/user")
const communityRoute = require("./routes/community")
const cookieParser = require("cookie-parser")
const {validateTokenAndSaveUserDetails} = require("./middlewares/authentication");
const community = require("./models/community");
const Chat = require("./models/chat");
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
const users = {};
io.on('connection',(socket)=>{
    socket.on("userName",async(userName)=>{
        users[socket.id] = userName;
    })


    socket.on('joinRoom', async(room) => {

        socket.join(room);
        console.log(`User joined room: ${room}`);
  

        await Chat.find({ room }).sort({ timestamp: 1 }).then(chats => {
            socket.emit('previousMessages', chats);
        }).catch(err => {
            console.error('Error fetching previous messages', err);
        });

    socket.on('chat message', async(msg) => {
        const userName = users[socket.id] 
        console.log(msg)
        console.log(userName)
        const chatMessage = await  Chat.create({ room, userName, msg });
        

        chatMessage.save().then(() => {
            io.to(room).emit('chat message', {userName,msg});
            console.log(`Message sent to room ${room}: ${msg}`);
        }).catch(err => {
            console.error('Error saving message to database', err);
        });
    });
    });
})
server.listen(port,()=>{
    console.log("server connected to port"+ port)
})

