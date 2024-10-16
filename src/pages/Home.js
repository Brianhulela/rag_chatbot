import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  Container,
  Fab,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import PersistentDrawerLeft from "../component/PersistentDrawerLeft";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Messages from "../component/Messages";
import SendRoundedIcon from '@mui/icons-material/SendRounded';

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const drawerWidth = 240;

function Home() {
  const [response, setResponse] = useState("");
  const [input, setInput] = useState("");

  const [open, setOpen] = React.useState(true);
  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
    <Box>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Right side - Main Chat Interface */}
      <Container maxWidth="md">
        <Messages response={response} />

        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            mb: 2,
          }}
        >
          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            maxWidth="lg"
            sx={{ mr: 1 }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <Fab color="info" variant="extended" onClick={handleSend}>
            <SendRoundedIcon sx={{ mr: 1 }} />
            Send
          </Fab>
        </Box>
      </Container>
    </Box>
  );
}

export default Home;
