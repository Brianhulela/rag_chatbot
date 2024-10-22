import { TextField, Box, Fab, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import { drawerWidth } from "../constants/DrawerConstants";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { useTheme } from "@emotion/react";

function QueryInput({ open, sendUserQuery }) {
  const [input, setInput] = useState("");
  const theme = useTheme();

  const handleSend = () => {
    // Handle send logic here
    sendUserQuery(input);
    setInput(""); // Clear input after send
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        position: "fixed",
        bottom: 0,
        left: open ? `${drawerWidth}px` : 0, // Adjust left position based on drawer state
        right: 0,
        width: open ? `calc(100% - ${drawerWidth}px)` : "100%", // Adjust width based on drawer state
        zIndex: 1000, // Ensure it's above other content
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      <Box sx={{ display: "flex", width: "100%", alignItems: "center" }}>
        <TextField
          fullWidth
          label="Message"
          variant="filled"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          multiline
          maxRows={5}
          slotProps={{
            input: {
              disableUnderline: true, // Removes the underline using the new API
              sx: {
                borderRadius: "16px", // Make the corners rounded
              },
            },
          }}
          sx={{
            borderRadius: "24px", // Make the corners rounded
            overflow: "hidden", // Ensure the border radius is applied
            backgroundColor: "background.paper", // Adjust background color to match theme
          }}
        ></TextField>
        <Fab
          sx={{ ml: 2 }}
          variant="extended"
          color="primary"
          onClick={handleSend}
        >
          <SendRoundedIcon sx={{ mr: 1 }} />
          Send
        </Fab>
      </Box>

      <Typography variant="body2" sx={{ m: 1 }}>
        Responses may be inaccurate or incomplete. Always verify information
        before making decisions.
      </Typography>
    </Container>
  );
}

export default QueryInput;
