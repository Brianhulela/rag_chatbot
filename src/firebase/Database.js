import { db } from "../firebaseConfig.js";
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc
} from "firebase/firestore";

// Create new chat in firestore
export const addChat = async (chat) => {
  try {
    const docRef = await addDoc(collection(db, "Chats"), chat);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Read chats from Firestore in real-time using onSnapshot
export const subscribeToChats = (callback) => {
  const chatsCollectionRef = collection(db, "Chats");

  // Use onSnapshot to listen for updates in real time
  return onSnapshot(chatsCollectionRef, (snapshot) => {
    const chats = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(chats); // Invoke the callback with the chats data
  });
};

// Update an existing chat document in Firestore
export const updateChat = async (chatId, updatedFields) => {
    try {
        const chatRef = doc(db, "Chats", chatId); // Reference to the specific document
        await updateDoc(chatRef, updatedFields); // Update only the specified fields
        console.log("Document updated with ID: ", chatId);
    } catch (e) {
        console.error("Error updating document: ", e);
    }
};

// Delete a chat document from Firestore
export const deleteChat = async (chatId) => {
    try {
        const chatRef = doc(db, "Chats", chatId); // Reference to the specific document
        await deleteDoc(chatRef); // Delete the document
        console.log("Document deleted with ID: ", chatId);
    } catch (e) {
        console.error("Error deleting document: ", e);
    }
};
