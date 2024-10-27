import React from "react";
import {
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  List,
  Drawer,
  Fab,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemText from "@mui/material/ListItemText";
import { drawerWidth } from "../constants/DrawerConstants";
import { useTheme } from "@mui/material/styles";
import HomeDrawerHeader from "./HomeDrawerHeader";
import AddIcon from '@mui/icons-material/Add';
import { addChat } from "../firebase/Database";
import useAuth from "../firebase/useAuth";
import { Timestamp } from "firebase/firestore";
import moment from "moment";
import ChatOptions from "./ChatOptions";

function HomeDrawer({ open, handleDrawerClose, chats, setSelectedChat }) {
  const theme = useTheme();
  const { user } = useAuth();

  const handleAddChat = () => {
    if (user) {
      const newChat = {
        // Make title string current time in format 23 may 2024
        title: Timestamp.now(),
        uid: user.uid,
        createdAt: Timestamp.now(),  // Firestore's current timestamp
        updatedAt: Timestamp.now(),  // Use the same timestamp for both initially
      };
      addChat(newChat);
    }
  };

  return (
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
      <HomeDrawerHeader>
        <Fab onClick={handleAddChat} variant="extended" size="small">
          <AddIcon sx={{ mr: 1 }} />
          New Chat
        </Fab>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </HomeDrawerHeader>
      <Divider />
      <List>
        {/* Ensure chats is mapped correctly */}
        {chats.length > 0 ? (
          chats.map((chat) => (
            <ListItem key={chat.id} disablePadding>
              <ListItemButton
                sx={{ borderRadius: "16px", mx: 1, py: 0.5 }}
                onClick={() => setSelectedChat(chat)}
              >
                {/* Render chat title */}
                <ListItemText primary={moment(chat.title.toDate()).format("DD MMMM YYYY") || "Untitled Chat"} />
                <ChatOptions/>
              </ListItemButton>
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText primary="No chats available" />
          </ListItem>
        )}
      </List>
    </Drawer>
  );
}

export default HomeDrawer;
