import React from "react";
import { Typography, Container } from "@mui/material";
import HomeDrawerHeader from "./HomeDrawerHeader";
import { styled } from "@mui/material/styles";
import { drawerWidth } from "../constants/DrawerConstants";
import Messages from "./Messages";
import QueryInput from "./QueryInput";

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

function HomeMainContent({ open }) {
  return (
    <Main open={open}>
      <HomeDrawerHeader />
      <Container maxWidth="md" sx={{height: "100%", alignItems: "flex-end"}}>
        <Messages />
        <QueryInput open={open}/>
      </Container>
    </Main>
  );
}

export default HomeMainContent;
