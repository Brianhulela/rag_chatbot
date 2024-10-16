import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../firebase/useAuth";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    // While checking if the user is authenticated, you can return a loading indicator
    return <div>Loading...</div>; // You can use a better loader/spinner here
  }

  if (!user) {
    // If no user is authenticated, redirect to the sign-in page
    return <Navigate to="/signin" />;
  }

  // If the user is authenticated, render the protected content (children)
  return children;
};

export default ProtectedRoute;
