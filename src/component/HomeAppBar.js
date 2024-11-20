import React, { useState, useEffect } from "react";
import {
  Typography,
  Toolbar,
  IconButton,
  Box,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import { drawerWidth } from "../constants/DrawerConstants";
import ThemeSwitch from "./ThemeSwitch";
import useAuth from "../firebase/useAuth";
import { signOut } from "firebase/auth"; // Import the signOut function
import { auth } from "../firebaseConfig";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const settings = ["Account", "Sign Out"];

function HomeAppBar({ open, handleDrawerOpen }) {
  const { user } = useAuth();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName);
      setEmail(user.email);
      setPhotoURL(user.photoURL);
    }
  }, [user]);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth); // This signs the user out
      console.log("User successfully signed out");
      handleCloseUserMenu();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AppBar position="fixed" elevation={0} open={open} color="background">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={[
            {
              mr: 2,
            },
            open && { display: "none" },
          ]}
        >
          <MenuIcon />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" noWrap component="div">
            GPT Chatbot
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ThemeSwitch />

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={displayName} src={photoURL} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={
                      setting == "Sign Out"
                        ? handleSignOut
                        : handleCloseUserMenu
                    }
                  >
                    <Typography sx={{ textAlign: "center" }}>
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default HomeAppBar;
