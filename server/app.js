const express=require('express')
const http=require('http')
const {Server}=require('socket.io')
const cors=require('cors')
const signin = require('./middleware/signin')
const messages=require('./middleware/messages')
const Loadmessages = require('./middleware/loadmessages')
const app=express()
const functions=require('firebase-functions')
app.use(cors())
app.use(express.json());

const server=http.createServer(app)
const io=new Server(server,{
    cors:{
        origin: process.env.PORT ||"*",
        methods:["GET","POST"],
    }
})
app.get('/chatpage',(req,res)=>{

})

app.get('/',(req,res)=>{
    console.log('po poeski')
    
    })
    
app.post('/',signin,(req,res)=>{
    console.log(req.body)
    const {email}=req.body;
    const {password}=req.body;
    console.log(email, password)
    res.status(200)
})

io.on("connection",(socket)=>{
    console.log(` user connected ${socket.id}`)

    socket.on('join', (data) => {
        Loadmessages(data, (err, messages) => {
          if (err) {
            // handle error
            console.error(err);
            return;
          }
          socket.join(data);
          console.log(`${socket.id} has joined ${data}`);
          socket.emit('messages', messages);
        });
      });
      
    
socket.on('send',(data)=>{
    messages(data)
    console.log(data,'from messages')
return socket.to(data.room).emit('recieve',data)

})
   
socket.on("disconnect",()=>{
        console.log('user disconnected',socket.id)
    })

})

server.listen( process.env.PORT || 5001 ,()=>{
    console.log('app is listening...')
})

exports.api=functions.http.onRequest(app)