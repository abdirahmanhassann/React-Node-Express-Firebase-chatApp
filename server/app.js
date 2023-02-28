const express=require('express')
const http=require('http')
const {Server}=require('socket.io')
const cors=require('cors')
const signin = require('./middleware/signin')
const messages=require('./middleware/messages')
const Loadmessages = require('./middleware/loadmessages')
const app=express()
app.use(cors())
app.use(express.json());

const server=http.createServer(app)
const io=new Server(server,{
    cors:{
        origin:"http://localhost:3000",
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
      
    
socket.on('send', messages,(data)=>{
socket.to(data.room).emit('recieve',data)

})
   
socket.on("disconnect",()=>{
        console.log('user disconnected',socket.id)
    })

})

server.listen(5001,()=>{
    console.log('app is listening...')
})