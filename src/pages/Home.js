import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import HomeMainContent from "../component/HomeMainContent";
import HomeAppBar from "../component/HomeAppBar";
import HomeDrawer from "../component/HomeDrawer";
import { subscribeToChats } from "../firebase/Database";
import useAuth from "../firebase/useAuth";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    if (user?.uid) {
      const unsubscribe = subscribeToChats(user.uid, (chats) => {
        setChats(chats);
      });
      // Cleanup subscription on unmount
      return () => unsubscribe();
    }
  }, [user?.uid]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <HomeAppBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <HomeDrawer
        open={open}
        handleDrawerClose={handleDrawerClose}
        chats={chats}
        setSelectedChat={setSelectedChat}
      />
      <HomeMainContent open={open} />
    </Box>
  );
}
