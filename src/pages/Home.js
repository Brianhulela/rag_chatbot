import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function Home() {
  const [response, setResponse] = useState("");
  const [input, setInput] = useState("");

  const chatHistory = [
    { id: 1, message: "Mlungisi October 4 Topic" },
    { id: 2, message: "Mlungisi November 4 Topic" },
  ];

  const handleSend = async () => {
    try {
      if (input.trim() === "") {
        return; // Ignore empty input
      }

      const encodeInput = encodeURIComponent(input);
      const response = await axios.get(
        `https://p37ydcmuafkhbmbmmck2x4cawm0bmxpz.lambda-url.us-east-1.on.aws/?query=${input}`
      );
      setResponse(response.data);
    } catch (error) {
      console.error("CORS Error or another issue:", error);
    }
  };

  return (
    <Grid container spacing={2}>
      {/* Left side - Chat History */}
      <Grid item xs={4}>
        <Box
          sx={{
            height: "80vh",
            border: "1px solid #ddd",
            borderRadius: 2,
            overflowY: "auto",
            padding: 8,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            History
          </Typography>
          <List>
            {chatHistory.map((chat) => (
              <ListItem key={chat.id} button>
                <ListItemText primary={chat.message} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Grid>

      {/* Right side - Main Chat Interface */}
      <Grid item xs={8}>
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
          sx={{ mt: 45 }}
        >
          {response === "" ? (
            <Typography variant="h5" sx={{ mb: 2 }}>
              Hello, What's Up
            </Typography>
          ) : (
            <ReactMarkdown>{response}</ReactMarkdown>
          )}

          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            sx={{ maxWidth: 500, width: "100%" }}
          >
            <TextField
              label="Comment or Ask Anything"
              variant="outlined"
              fullWidth
              sx={{ mr: 1 }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <Button
              variant="contained"
              sx={{ minHeight: "56px", width: "25%" }}
              onClick={handleSend}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Home;
