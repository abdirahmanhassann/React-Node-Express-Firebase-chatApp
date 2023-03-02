import React from 'react';
import { useEffect, useState } from 'react';
import '../App.css';
import { Button, TextField,Typography } from '@mui/material'
import '@fontsource/roboto/300.css';
import { useNavigate } from 'react-router';
function Signin() {
  const [po,setpo]=useState<p[]>();
  const [changed,setchanged]=useState({email:null,password:null})
  const [sent,setsent]=useState(false)
  const navigate=useNavigate()
  interface p{
    name:string;
    age:number;
  }

  const url= process.env.PORT || "http://localhost:5001"


function changedfunc(e){
setchanged(i=>{
  return {
    ...i,
    [e.target.name]:e.target.value
  }
})
}
function submitted(e){
  e.preventDefault()
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(changed),
  })
    .then(response => response.json())
    .then(changed => {
      console.log(changed);
      if(changed.email && changed.password){
        localStorage.setItem('Email',changed.email)
        console.log('signed in')
navigate('/chatpage')
      }
      else{
        console.log('not signed in')
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
    
  
}
  return (
  <>
    <div className='centerdiv'>
      <Typography variant="h3" component="h2">
  Signup/Login
</Typography>

      <form onSubmit={submitted}>
    <TextField id="outlined-basic" type='email' label="Email" 
     variant="outlined" name='email' required={true} value={changed.email} onChange={e=>{changedfunc(e)}}/>
    <TextField id="outlined-basic" type='password' label="password" variant="outlined" 
    name='password' required={true} onChange={e=>{changedfunc(e)}} value={changed.password} />
<Button variant="outlined" aria-label="outlined button group" type='submit'>Enter</Button>
      </form>
    </div>
 </>
  )
}

export default Signin;
