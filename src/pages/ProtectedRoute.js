import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../firebase/useAuth";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // If no user is authenticated, redirect to the sign-in page
    return <Navigate to="/signin" />;
  }

  // If the user is authenticated, render the protected content (children)
  return children;
};

export default ProtectedRoute;
