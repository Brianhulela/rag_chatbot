import {db} from '../firebaseConfig.js'
import { collection, addDoc } from "firebase/firestore"; 

// Create new chat in firestore
export const addChat = async (chat) => {
    try {
        const docRef = await addDoc(collection(db, "Chats"), chat);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}