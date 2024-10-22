import React, {useState, useEffect} from "react";
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

  useEffect(() => {
    if (user && selectedChat) {
      const unsubscribe = subscribeToMessages(selectedChat.id, (messages) => {
        setMessages(messages);
      });
      return () => unsubscribe();
    }
  }, [user, selectedChat]);

  const sendUserQuery = async (input) => {
    try {
      if (input.trim() === "") {
        return; // Ignore empty input
      }

      if (user && selectedChat){
        // Add user message to database
        const userMessage = {
          chatId: selectedChat.id,
          uid: user.uid,
          text: input,
          createdAt: Timestamp.now(),
          sender: "USER"
        }

        addMessage(userMessage);

        const encodeInput = encodeURIComponent(input);
        const response = await axios.get(
          `https://p37ydcmuafkhbmbmmck2x4cawm0bmxpz.lambda-url.us-east-1.on.aws/?query=${input}`
        );
        setResponse(response.data);

        const aiMessage = {
          chatId: selectedChat.id,
          uid: user.uid,
          text: response.data,
          createdAt: Timestamp.now(),
          sender: "AI"
        }

        addMessage(aiMessage);
      }

      // Add AI respose to database
    } catch (error) {
      console.error("CORS Error or another issue:", error);
    }
  };

  return (
    <Main open={open}>
      <HomeDrawerHeader />
      <Container maxWidth="md" sx={{height: "100%", alignItems: "flex-end"}}>
        <Messages messages={messages} response={response}/>
        <QueryInput open={open} sendUserQuery={sendUserQuery}/>
      </Container>
    </Main>
  );
}

export default HomeMainContent;
