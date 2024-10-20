import React from "react";
import {
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  List,
  Drawer,
  Typography,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { drawerWidth } from "../constants/DrawerConstants";
import { useTheme } from "@mui/material/styles";
import HomeDrawerHeader from "./HomeDrawerHeader";

function HomeDrawer({ open, handleDrawerClose }) {
  const theme = useTheme();
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
        {["Hello, world", "OpenAI API", "React Application", "How to cook eggs"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton sx={{borderRadius: "16px", mx: 1, py: 0.5}}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default HomeDrawer;
