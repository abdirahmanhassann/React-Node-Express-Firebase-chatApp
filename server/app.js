const express=require ('express')
const cors=require('cors')
const app=express()
// const db=require('./firebase/firebase')
 const signin=require('./middleware/signin')
app.use(cors())
app.use(express.json());

app.get('/',(req,res)=>{
console.log('po poeski')

})

app.post('/',signin,(req,res)=>{
    const {email}=req.body;
    const {password}=req.body;
    console.log(email, password)
    res.status(200)
})

app.listen(5001,()=>{
    console.log('app is listening on port 5001....')
})

