import React, { useEffect, useState } from "react";
import'../App.css'
import  {io} from "socket.io-client";
import { Button, TextField, Typography } from "@mui/material";

const socket= io('http://localhost:5001')

console.log(socket)
function Chatpage(){
    const [username,setusername]=useState<string>('')
    const [room,setroom]=useState<string>('')
    const [entered,setentered]=useState<Boolean>(false)
    const [message,setMessage]=useState <object[]>([{}])
    const [input,setinput]=useState('')
 
    async function  submitted2(e){
        e.preventDefault()
      //  let po=new Date(Date.now()).getHours() +":"+new Date(Date.now()).getMinutes()
if(input!==''){
const sendMessage={
    message:input,
    room:room,
    author:localStorage.getItem('Email'),
    time:'19:20'
}
console.log(sendMessage)
await socket.emit('send',sendMessage)
setMessage((prevmessage)=>[...prevmessage,sendMessage])
}
setinput('')
}
useEffect(()=>{
    socket.on('recieve',(data)=>{
    setMessage((prevmessage)=>[...prevmessage,data])

})
    },[])
        
        
function submitted(e){
    e.preventDefault()
    if(username!==''&& room !==''){
        console.log(username,room)
socket.emit('join',room)
setentered(true)
    }
}
    return (
        <>
        <div className="centerdiv">
    <form onSubmit={submitted}>
    <TextField id="outlined-basic" type='text' label="name" 
    value={username} onChange={(e)=>{setusername(e.target.value)}} />

    <TextField id="outlined-basic" type='text' label="Room id" 
    value={room} onChange={(e)=>{setroom(e.target.value)}}
    />
<Button variant="outlined" aria-label="outlined button group" type='submit'>Enter</Button>
      </form>
        </div>
        <div className="messagediv">
        <div className='submessage'>
    {
        message && message.map((i)=>{
          return (
<div className={i.author===localStorage.getItem('Email')? 'message1' : 'message2'}>
    <Typography variant="h6" component="h2">
{i.message}
</Typography>
    <Typography variant="subtitle2" component="h2">
{i.author}
</Typography>
    <Typography variant="subtitle2" component="h2">
{i.time}
</Typography>
</div>
          )
            
        })
    }

    </div>
    <TextField id="outlined-basic" type='text' label="enter message" value={input}
     onChange={(e)=>setinput(e.target.value)} 
     onKeyDown={(event)=>{
        event.key==='Enter' && submitted2(event)
        }}
     />
<Button variant="outlined" aria-label="outlined button group"  onClick={submitted2}>Enter</Button>

        </div>
        </>
    )
}


export default Chatpage