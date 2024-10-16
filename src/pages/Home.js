import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import HomeMainContent from "../component/HomeMainContent";
import HomeAppBar from "../component/HomeAppBar";
import HomeDrawer from "../component/HomeDrawer";
import { drawerWidth } from "../constants/DrawerConstants";

export default function Home() {
  const [open, setOpen] = React.useState(false);

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
      <HomeDrawer open={open} handleDrawerClose={handleDrawerClose} />
      <HomeMainContent open={open} />
    </Box>
  );
}
