 const { db } =require ("../firebase/firebase")
// const  getDocs  = require("firebase/firestore/getDocs");
const signin= async(req,res,next)=>{
    const {email}=req.body;
    const {password}=req.body;
    const  usersCollectionRef=db.collection('auth')
    const snapshot = await usersCollectionRef.get()
    return snapshot.docs.map(doc => {
        doc.data()
        console.log(doc.data())
    });

const newsignin=async()=>
{
    const  users= await usersCollectionRef.set({
        email:email,
        password:password
    })
    
}


    next()
}
module.exports=signin