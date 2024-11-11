import React, { useState, useEffect, useRef } from "react";
import { Container } from "@mui/material";
import HomeDrawerHeader from "./HomeDrawerHeader";
import { styled } from "@mui/material/styles";
import { drawerWidth } from "../constants/DrawerConstants";
import Messages from "./Messages";
import QueryInput from "./QueryInput";
import axios from "axios";
import { addMessage, subscribeToMessages } from "../firebase/Database";
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

function HomeMainContent({ open, selectedChat }) {
  const [response, setResponse] = useState("");

  const [messages, setMessages] = useState([]);
  const { user } = useAuth();

  const [streamedResponse, setStreamedResponse] = useState("");

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

  const streamAIResponse = async (input) => {
    let accumulatedData = "";

    try {
      if (input.trim() === "") {
        return; // Ignore empty input
      }

      if (user && selectedChat) {
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

        const CHAT_API_ENDPOINT =
          "https://xxmhk4kkfygvtafudhviiy7ol40gwkuq.lambda-url.us-east-1.on.aws/";

        const response = await fetch(
          `${CHAT_API_ENDPOINT}?query=${encodedQuery}`
        );

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
      }
    } catch (error) {
      console.error("Error invoking Lambda function:", error);
    }
  };

  return (
    <Main open={open}>
      <HomeDrawerHeader />
      <Container maxWidth="md" sx={{ height: "100%", alignItems: "flex-end" }}>
        <Messages messages={messages} response={response} streamedResponse={streamedResponse} />
        <div ref={messagesEndRef} />
        <QueryInput open={open} sendUserQuery={streamAIResponse} />
      </Container>
    </Main>
  );
}

export default HomeMainContent;
