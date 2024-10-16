import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import ProtectedRoute from "./pages/ProtectedRoute";
import ResponsiveAppBar from "./component/ResponsiveAppBar";
import PersistentDrawerLeft from "./component/PersistentDrawerLeft";

function App() {
  return (
    <Router>
      <div>
        <ResponsiveAppBar/>
        <Routes>
          {/* Protect the Home page */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          {/* Protect the Chat page */}
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />

          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
