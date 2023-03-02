const { db } =require ("../firebase/firebase")

// const  getDocs  = require("firebase/firestore/getDocs");
const Loadmessages = async (data, callback) => {
    console.log(data);
    const usersCollectionRef = db.collection('chats').doc(data);
    const po = await usersCollectionRef.get();
    if (po) {
      console.log(po.data().messages);
      callback(null, po.data()?.messages);
    } else {
      console.log('po doesnt exist');
      callback(new Error('Chat room not found'), null);
    }
  };
  
  module.exports = Loadmessages;
  