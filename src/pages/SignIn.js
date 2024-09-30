import React, {useState} from "react";
import {
  Container,
  Button,
  TextField,
  Typography,
  Fab,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignInEmailPassword = () => {
    // TODO
    console.log("Signing in with", email, password);
  };

  const handleSignInWithGoogle = () => {
    // TODO
    console.log("Signing in with Google");
  }

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
      <TextField value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mt: 4 }} fullWidth variant="outlined" label="Email" type="email" />
      <TextField
        fullWidth
        variant="outlined"
        label="Password"
        type="password"
        sx={{ mt: 1 }}
        value={password}
        onChange={(e) => setPassword(e.target.value)} 
      />
      <Button onClick={handleSignInEmailPassword} sx={{ mt: 1 }} fullWidth variant="contained">
        Sign In
      </Button>

      <Fab onClick={handleSignInWithGoogle} sx={{ mt: 2 }} variant="extended">
        <GoogleIcon sx={{ mr: 1 }} />
        Continue with Google
      </Fab>
    </Container>
  );
}

export default SignIn;