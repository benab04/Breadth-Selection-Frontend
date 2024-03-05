import React, { Children, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import Cookies from "js-cookie";
const Protected = ({ children, userdb, updateuserdb }) => {
  useEffect(() => {
    // Load user from cookie when component mounts
    const userCookie = Cookies.get("username");
    if (userCookie) {
      try {
        const decryptedUser = JSON.parse(userCookie);
        updateuserdb(decryptedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const { user } = UserAuth();
  if (user || userdb != null) {
    return children;
  }
  return <Navigate to="/" />;
};

export default Protected;
