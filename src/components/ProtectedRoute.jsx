import React from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");

  return isLoggedIn ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
