const { db } =require ("../firebase/firebase")
const { FieldValue } = require('firebase-admin/firestore');
// const  getDocs  = require("firebase/firestore/getDocs");

const messages= async(data,next)=>{

   const  usersCollectionRef=db.collection('chats')
   const snapshot = await usersCollectionRef.get()
   console.log(data.time)
 const data2={
    message:data.message,
    author:data.author,
time:data.time
} 
await   usersCollectionRef.doc(data.room).set({messages:FieldValue.arrayUnion(data2)}, { merge: true })
  
// next()
}

module.exports=messages