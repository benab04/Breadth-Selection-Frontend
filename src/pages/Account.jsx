import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import "./pageStyles/AccountPage.css";

function Account() {
  const { logOut, user } = UserAuth();
  const [content_clean, setContent] = useState([null]);
  const [graphIndex, setGraphIndex] = useState(null);
  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return <div></div>;
}

export default Account;
