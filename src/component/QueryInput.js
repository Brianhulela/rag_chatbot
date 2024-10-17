import { TextField, Box, Fab, Container, Typography } from "@mui/material";
import React from "react";
import { drawerWidth } from "../constants/DrawerConstants";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

function QueryInput({ open }) {
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
      }}
    >
      <Box sx={{ display: "flex", width: "100%", alignItems: "center" }}>
        <TextField
          fullWidth
          label="Message"
          variant="filled"
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
        <Fab sx={{ ml: 2 }} variant="extended" color="primary">
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
