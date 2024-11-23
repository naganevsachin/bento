// src/components/PrivateRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "@/lib/context/user";

interface PrivateRouteProps {
  element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const { isAuthenticated } = useUser();
  console.log("Auth Private Route:", isAuthenticated);

  return isAuthenticated ? element : <Navigate to="/" replace />;
};

export default PrivateRoute;
