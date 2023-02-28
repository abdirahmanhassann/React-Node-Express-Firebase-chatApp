 const { db } =require ("../firebase/firebase")

 // const  getDocs  = require("firebase/firestore/getDocs");
const signin= async(req,res,next)=>{
    console.log(req.body)
    const {email}=req.body;
    const {password}=req.body;
    const  usersCollectionRef=db.collection('auth')
    const snapshot = await usersCollectionRef.get()
const info= snapshot.docs.find(doc => { 
    console.log(doc.data())
    return email==doc.data().email && password==doc.data().password});
if(info){
console.log(info.data(),'success')
  return  res.status(200).json({email:email,password:password})
}
else{
    console.log(info,'error')
    return res.status(404).json('error')
}

const newsignin=async()=>
{
    const  users= await usersCollectionRef.set({
        email:email,
        password:password
    })
    
next()
}


}
module.exports=signin