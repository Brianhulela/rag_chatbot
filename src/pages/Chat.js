import React, {useState, useEffect} from "react";
import { addChat, subscribeToChats } from "../firebase/Database";
import { Button, Container, List, ListItem, ListItemText } from "@mui/material";
import useAuth from "../firebase/useAuth";
import { Timestamp } from "firebase/firestore";

function Chat() {
  const { user } = useAuth();
  const [chats, setChats] = useState([]); // State to store chat messages


  const handleAddChat = async () => {
    if (user) {
      const testChat = {
        title: "Test Chat",
        uid: user.uid,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };
      await addChat(testChat);
    }
  };

   // Use useEffect to subscribe to real-time chat updates
   useEffect(() => {
    const unsubscribe = subscribeToChats((fetchedChats) => {
      setChats(fetchedChats); // Update the state when new data is fetched
    });

    // Cleanup the subscription on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <Container>
      <Button onClick={handleAddChat} variant="contained">
        Add chat
      </Button>

      <List>
        {chats.map((chat) => (
          <ListItem key={chat.id}>
            <ListItemText
              primary={chat.title}
              secondary={`Created At: ${chat.createdAt}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default Chat;
