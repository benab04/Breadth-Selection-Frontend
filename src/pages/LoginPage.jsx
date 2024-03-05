import React from "react";
import SignIn from "../components/SignIn/SignIn";

function LoginPage({ userdb, updateuserdb }) {
  return <SignIn userdb={userdb} updateuserdb={updateuserdb} />;
}
export default LoginPage;
