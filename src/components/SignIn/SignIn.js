import React, { useEffect, useState } from "react";
import { GoogleButton } from "react-google-button";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";
function SignIn({ userdb, updateuserdb }) {
  const loader = document.getElementById("loader");
  const base_url = process.env.REACT_APP_BASE_URL;
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
    if (user?.displayName != null || userdb != null) {
      loader.style.display = "none";

      // console.log(user);
      // window.close();
      navigate("/");
    }
  }, [user]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const response = await fetch(base_url + "login/", {
        method: "POST",
        body: formData,
      });
      console.log(formData.get("username"));
      const responseText = await response.json();
      if (response.status == 200) {
        console.log(Object.values(responseText));
        const handleupdateuserdb = () => {
          updateuserdb([
            {
              username: formData.get("username"),
            },
            {
              password: formData.get("password"),
            },
          ]);
        };
        handleupdateuserdb();
        window.close();
        navigate("/");
      } else if (response.status == 400) {
        console.log(Object.values(responseText));
      } else if (response.status == 401) {
        console.log(Object.values(responseText));
      }
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };
  return (
    <div className="sign-in">
      <div className="glassy-container">
        <h1 className="sign-in-head">Sign In</h1>
        <form
          className="login-form"
          onSubmit={(e) => {
            handleSignIn(e);
          }}
        >
          {/* <div class="mb-3"> */}
          <input
            type="email"
            class="form-control mb-3"
            id="exampleInputEmail1"
            placeholder="Email address"
            aria-describedby="emailHelp"
            name="username"
            required
          />
          <input
            type="password"
            class="form-control mb-3"
            id="exampleInputPassword1"
            placeholder="Password"
            name="password"
            required
          />
          <button type="submit" class="btn btn-primary sign-in-button my-2">
            Sign In
          </button>
        </form>
        <div>
          <GoogleButton onClick={handleGoogleSignIn} />
        </div>
        <div>
          <p className="my-3">
            Do not have an account? <a href="/register">Register</a>
          </p>
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
