import { db } from "../firebaseConfig.js";
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
  query,
  where
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

// Read chats from Firestore in real-time using onSnapshot, filtered by uid
export const subscribeToChats = (uid, callback) => {
  const chatsCollectionRef = collection(db, "Chats");

  // Create a query to filter chats by the user's uid
  const chatsQuery = query(chatsCollectionRef, where("uid", "==", uid));

  // Use onSnapshot to listen for updates in real-time for the filtered chats
  return onSnapshot(chatsQuery, (snapshot) => {
    const chats = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(chats); // Invoke the callback with the filtered chats data
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
