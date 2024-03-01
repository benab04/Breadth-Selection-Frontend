import React, { useEffect, useState } from "react";
import { GoogleButton } from "react-google-button";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";
function SignIn() {
  const loader = document.getElementById("loader");

  if (loader != null) {
    loader.style.display = "none";
  }
  // console.log(loader);
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();
  const handleGoogleSignIn = async () => {
    try {
      loader.style.display = "block";
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // console.log(user);
    if (user?.displayName != null) {
      loader.style.display = "none";
      window.close();
      navigate("/");
    }
  }, [user]);

  return (
    <div className="sign-in">
      <div className="glassy-container">
        <h1 className="sign-in-head">Sign In</h1>

        <div>
          <GoogleButton onClick={handleGoogleSignIn} />
        </div>

        <div id="loader">
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
