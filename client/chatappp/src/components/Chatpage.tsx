import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { TextDecoder } from 'util';

function Chatpage() {
    const [message, setMessage] = useState<string[]>([]);
    const [ress,setress]=useState('')
    const email:string|null=localStorage.getItem('Email')
   
    useEffect(() => {
        const socket = new WebSocket('ws://localhost:5002');

        // Connection opened
        socket.addEventListener('open', function (event) {
          console.log('Connected to WS Server');
        });
    
        // Listen for messages
        socket.addEventListener('message', function (event) {
            event.data.text().then((messagee: string) => {
                setMessage((prevMessages) => [...prevMessages, messagee]);
              });
});

return () => {
    // Close the connection when the component unmounts
    socket.close();
    setMessage([...message,ress]);
        };
          }, []);
    

  return (

    <div className='centerdiv'>
       <Typography variant="h4" component="h2">
 Welcome !  {email}
</Typography>
<div className='chatdiv'>
    <div className='scrolldiv'></div>
    <div className='messagediv'>
    {
        message && message.map((i)=>{
          return (
<div>
    <Typography variant="h6" component="h2">
{i}
</Typography>
</div>
          )
            
        })
    }
</div>
</div>

         </div>
  )
}

export default Chatpage