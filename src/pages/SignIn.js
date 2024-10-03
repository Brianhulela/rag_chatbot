import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  TextField,
  Typography,
  Fab,
  Avatar,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth"; // Import the signOut function
import { signInWithEmailAndPassword } from "firebase/auth";


function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleSignInEmailPassword = async () => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('User signed in:', userCredential.user);
      } catch (error) {
        console.error(error.message);
      }
  };

  const handleSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
    }
  };

  useEffect(() => {
    // Observe the authentication status
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update the user state
    });

    // Cleanup the subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth); // This signs the user out
      console.log("User successfully signed out");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

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
        <Typography variant="body1">Signed in as: {user && user.email}</Typography>
      <Avatar
        alt={user?.email && user.email}
        src={user?.photoURL && user.photoURL}
        sx={{ width: 24, height: 24 }}
      />
      <Typography variant="h4">Sign In</Typography>
      <TextField
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ mt: 4 }}
        fullWidth
        variant="outlined"
        label="Email"
        type="email"
      />
      <TextField
        fullWidth
        variant="outlined"
        label="Password"
        type="password"
        sx={{ mt: 1 }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        onClick={handleSignInEmailPassword}
        sx={{ mt: 1 }}
        fullWidth
        variant="contained"
      >
        Sign In
      </Button>

      <Fab onClick={handleSignInWithGoogle} sx={{ mt: 2 }} variant="extended">
        <GoogleIcon sx={{ mr: 1 }} />
        Continue with Google
      </Fab>
      <Button variant="outlined" onClick={handleSignOut}>
        Sign Out
      </Button>
    </Container>
  );
}

export default SignIn;
