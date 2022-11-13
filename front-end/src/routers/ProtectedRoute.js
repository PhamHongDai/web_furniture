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

export default ProtectedRoute;