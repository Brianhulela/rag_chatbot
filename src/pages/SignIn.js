import React from "react";
import {
  Box,
  Container,
  Button,
  TextField,
  Typography,
  Fab,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

function SignIn() {
  return (
    <Container
      maxWidth="xs"
      sx={{ 
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        }}
    >
      <Typography variant="h4">Sign In</Typography>
      <TextField sx={{ mt: 4 }} fullWidth variant="outlined" label="Email" type="email" />
      <TextField
        fullWidth
        variant="outlined"
        label="Password"
        type="password"
        sx={{ mt: 1 }} 
      />
      <Button sx={{ mt: 1 }} fullWidth variant="contained">
        Sign In
      </Button>

      <Fab sx={{ mt: 2 }} variant="extended">
        <GoogleIcon sx={{ mr: 1 }} />
        Continue with Google
      </Fab>
    </Container>
  );
}

export default SignIn;
