import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const user = useSelector((state) => state.auth.authData
  );

  return !user &&
    (location.pathname === "/editor" || location.pathname === "/templates") ? (
    <Navigate to="/login" />
  ) : (
    <Outlet />
  );
};

export default Layout;
