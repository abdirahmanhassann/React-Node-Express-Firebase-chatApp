import { Button, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

function Chatpage2() {
    
    const email:string|null=localStorage.getItem('Email')
   const [refresh,setrefresh]=useState(false)
const [message,setMessage]=useState<string[]>([])
const [input,setinput]=useState('')
    useEffect(() => {
        const socket = new WebSocket('ws://localhost:5002');
    
        // Connection opened
        socket.addEventListener('open', function (event) {
          console.log('Connected to WS Server');
        });
    
        // Listen for messages
        socket.addEventListener('message', function (event) {
          console.log('Message from server ', event);
      
              socket.send(input);
            
              socket.close();
        
        });
        
      }, [refresh]);
    
      function submitted(e):void{
e.preventDefault()
setMessage([...message,input])
//setinput('')
setrefresh((i)=>!i)
      }

  return (

    <div className='centerdiv'>
       <Typography variant="h4" component="h2">
 Welcome !  {email}
</Typography>
<div className='chatdiv'>
    <div className='scrolldiv'></div>
    <form onSubmit={submitted}>
    <TextField id="outlined-basic" type='text' label="enter message"  value={input} onChange={(e)=>{setinput(e.target.value)}}/>
<Button variant="outlined" aria-label="outlined button group" type='submit'>Enter</Button>
      </form>

    <div className='messagediv'></div>
</div>

         </div>
  )
}

export default Chatpage2