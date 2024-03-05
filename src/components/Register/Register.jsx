import React, { useEffect, useState } from "react";
import { GoogleButton } from "react-google-button";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Register.css";
function Register() {
  const loader = document.getElementById("loader");
  const base_url = process.env.REACT_APP_BASE_URL;
  if (loader != null) {
    loader.style.display = "none";
  }
  // console.log(loader);
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();
  const [newpass, setnewpass] = useState("");
  const [confirmpass, setconfirmpass] = useState("");
  const [error, setError] = useState("");

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

      // console.log(user);
      // window.close();
      // navigate("/");
    }
  }, [user]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const response = await fetch(base_url + "register/", {
        method: "POST",

        body: formData,
      });
      const responseText = await response.json();
      // if (response.ok) {
      //   // If the response is successful (status code 200-299), handle it here
      // } else {
      //   // If the response is not successful, throw an error or handle it as needed
      //   console.log(responseText);
      //   throw new Error("Form submission failed");
      // }
      if (response.status == 200) {
        console.log(Object.values(responseText));
        navigate("/");
      } else if (response.status == 400) {
        console.log(Object.values(responseText));
        setError("User is already registered");
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      } else if (response.status == 401) {
        console.log(Object.values(responseText));
      }
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
    console.log(e);
  };
  return (
    <div className="sign-in register-page">
      <div className="glassy-container">
        <h1 className="sign-in-head">Register</h1>
        <form
          className="login-form"
          onSubmit={(e) => {
            newpass === confirmpass ? handleSignIn(e) : e.preventDefault();
            setError("Passwords should match");
          }}
        >
          <input
            type="text"
            class="form-control mb-3"
            placeholder="First name"
            aria-label="First name"
            name="first_name"
          ></input>
          <input
            type="text"
            class="form-control mb-3"
            placeholder="Last name"
            aria-label="Last name"
            name="last_name"
          ></input>
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
            placeholder="New Password"
            required
            onChange={(e) => {
              setnewpass(e.target.value);
            }}
          />
          <input
            type="password"
            className={
              newpass === confirmpass
                ? newpass != ""
                  ? "  form-control mb-3  same-border"
                  : " form-control mb-3"
                : "form-control mb-3  not-same-border"
            }
            id="exampleInputPassword1"
            placeholder="Confirm Password"
            name="password"
            required
            onChange={(e) => {
              setconfirmpass(e.target.value);
            }}
          />
          <p style={{ color: "red" }}>{error ? error : null}</p>
          <button type="submit" class="btn btn-primary sign-in-button my-2">
            Register
          </button>
        </form>
        <div>
          <GoogleButton onClick={handleGoogleSignIn} />
        </div>
        <div>
          <p className="my-3">
            Already have an account? <a href="/signin">Login</a>
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

export default Register;
