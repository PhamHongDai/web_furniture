import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = window.localStorage.getItem("token");
  return (
    !token ? <Navigate to="/signin"/> : <Outlet/>
  )
}

export const ProtectedCheckout = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    !isAuthenticated ? <Navigate to="/cart"/> : <Outlet/>
  )
}

export const ProtectedUrl = () => {
  return (
    <Navigate to="/"/>
  )
}

export const Protected = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }
  return children;
};

export default ProtectedRoute;