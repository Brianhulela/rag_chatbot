import {db} from '../firebaseConfig.js'
import { collection, addDoc, onSnapshot } from "firebase/firestore"; 

// Create new chat in firestore
export const addChat = async (chat) => {
    try {
        const docRef = await addDoc(collection(db, "Chats"), chat);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

// Read chats from Firestore in real-time using onSnapshot
export const subscribeToChats = (callback) => {
    const chatsCollectionRef = collection(db, "Chats");
    
    // Use onSnapshot to listen for updates in real time
    return onSnapshot(chatsCollectionRef, (snapshot) => {
        const chats = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        callback(chats); // Invoke the callback with the chats data
    });
};
