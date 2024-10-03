import React from "react";
import { addChat } from "../firebase/Database";
import { Button, Container } from "@mui/material";
import useAuth from "../firebase/useAuth";

function Chat() {
  const { user } = useAuth();

  const handleAddChat = async () => {
    if (user) {
      const testChat = {
        title: "Test Chat",
        uid: user.uid,
      };
      await addChat(testChat);
    }
  };
  
  return (
    <Container>
      <Button onClick={handleAddChat} variant="contained">
        Add chat
      </Button>
    </Container>
  );
}

export default Chat;
