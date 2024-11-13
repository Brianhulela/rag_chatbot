import React, { useState, useEffect, useRef } from "react";
import { Container } from "@mui/material";
import HomeDrawerHeader from "./HomeDrawerHeader";
import { styled } from "@mui/material/styles";
import { drawerWidth } from "../constants/DrawerConstants";
import Messages from "./Messages";
import QueryInput from "./QueryInput";
import axios from "axios";
import { addMessage, subscribeToMessages, addChat } from "../firebase/Database";
import useAuth from "../firebase/useAuth";
import { Timestamp } from "firebase/firestore";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        },
      },
    ],
  })
);

function HomeMainContent({ chats, open, selectedChat, setSelectedChat }) {
  const [response, setResponse] = useState("");

  const [messages, setMessages] = useState([]);
  const { user } = useAuth();

  const [newChatId, setNewChatId] = useState(null);

  const [streamedResponse, setStreamedResponse] = useState("");

  const [input, setInput] = useState("");

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [streamedResponse]);

  useEffect(() => {
    if (user && selectedChat) {
      const unsubscribe = subscribeToMessages(selectedChat.id, (messages) => {
        setMessages(messages);
      });
      return () => unsubscribe();
    }
  }, [user, selectedChat]);

  useEffect(() => {
    if (selectedChat && newChatId) {
      handleConversation()
    }
    setNewChatId(null);
  }, [selectedChat]);

  useEffect(() => {
    if (newChatId) {
      // Get chat by id from chats array
      const chat = chats.find((chat) => chat.id === newChatId);
      setSelectedChat(chat); 
    }
  }, [chats, newChatId]);

  const handleAddChat = async () => {
    const newChat = {
      // Make title string current time in format 23 may 2024
      title: Timestamp.now(),
      uid: user.uid,
      createdAt: Timestamp.now(), // Firestore's current timestamp
      updatedAt: Timestamp.now(), // Use the same timestamp for both initially
    };
    const chatId = await addChat(newChat);
    return chatId;
  };

  const handleConversation = async () => {
    let accumulatedData = "";

    // Add user message to database
    const userMessage = {
      chatId: selectedChat.id,
      uid: user.uid,
      text: input,
      createdAt: Timestamp.now(),
      sender: "USER",
    };

    addMessage(userMessage);


    // Encode the query to ensure special characters are correctly interpreted
    const encodedQuery = encodeURIComponent(input);

    setInput("");

    const CHAT_API_ENDPOINT =
      "https://xxmhk4kkfygvtafudhviiy7ol40gwkuq.lambda-url.us-east-1.on.aws/";

    const response = await fetch(`${CHAT_API_ENDPOINT}?query=${encodedQuery}`);

    const reader = response.body.getReader();

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        const aiMessage = {
          chatId: selectedChat.id,
          uid: user.uid,
          text: accumulatedData,
          createdAt: Timestamp.now(),
          sender: "AI",
        };

        addMessage(aiMessage);

        // Set the streamed response to empty string
        setStreamedResponse("");
        break;
      }

      const decodedChunk = new TextDecoder().decode(value);
      accumulatedData += decodedChunk;

      setStreamedResponse((prevData) => prevData + decodedChunk);
    }
  };

  const streamAIResponse = async () => {
    try {
      if (input.trim() === "") {
        return; // Ignore empty input
      }

      if (user) {
        if (selectedChat) {
          handleConversation();
        } else {
          // TODO
          // Create a new chat
          const chatId = await handleAddChat();
          setNewChatId(chatId);
        }
      }
    } catch (error) {
      console.error("Error invoking Lambda function:", error);
    }
  };

  return (
    <Main open={open}>
      <HomeDrawerHeader />
      <Container maxWidth="md" sx={{ height: "100%", alignItems: "flex-end" }}>
        <Messages
          messages={messages}
          response={response}
          streamedResponse={streamedResponse}
        />
        <div ref={messagesEndRef} />
        <QueryInput
          open={open}
          sendUserQuery={streamAIResponse}
          input={input}
          setInput={setInput}
        />
      </Container>
    </Main>
  );
}

export default HomeMainContent;
