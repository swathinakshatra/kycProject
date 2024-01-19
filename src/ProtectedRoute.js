import React from "react";
import { Navigate } from "react-router-dom";
import authService from "./AdminComponents/Services/authService";

const ProtectedRoute = ({ children }) => {
  return authService.getCurrentUser() ? (
    <>{children}</>
  ) : (
    <Navigate to="/loginForm" />
  );
};

export default ProtectedRoute;
