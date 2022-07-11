const express=require('express');
const app=express();
const http=require('http');

const server=http.createServer(app);
const port =process.env.PORT || 3001;
const {Server} =require("socket.io");
const cors = require("cors");

var storage=[{name:"Initial",age:"0",dob:"2022-07-08",proffesion:"Student"}];

const Contact=[];

app.use(cors());

const io= new Server(server,{
    cors: {
        origin: 'https://database144.netlify.app',
        method: ["GET","POST"],
        credentials: true
    },
});

io.on("connection", (socket)=>{
    console.log(`user connected : ${socket.id}`);
    socket.on("getData",()=>{
        console.log(storage);
        socket.broadcast.emit("receive_message",storage);
    });
    socket.on("pushData",(data)=>{
        console.log(data);
        storage=data;
        // socket.broadcast.emit("receive_message",storage);
    });
    socket.on("contact",(data)=>{
        console.log(data);
        Contact.push(data);
    });
});

app.get("/",(req,res)=>{
    res.send(JSON.stringify(storage));
})
app.get("/contact",(req,res)=>{
    res.send(JSON.stringify(Contact));
})

server.listen(port,()=>{
    console.log("**Server is running**");
})
