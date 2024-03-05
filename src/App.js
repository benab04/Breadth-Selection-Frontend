import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { AuthContextProvider } from "./context/AuthContext";
import Account from "./pages/Account";
import Protected from "./components/Protected";
import RegisterPage from "./pages/RegisterPage";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
const ENCRYPTION_KEY = process.env.REACT_APP_ENCRYPTED_KEY;

function App() {
  const [userdb, setuserdb] = useState(null);
  function updateuserdb(e) {
    setuserdb(e);
  }

  // useEffect(() => {
  //   // Load and decrypt user from cookie when component mounts
  //   const encryptedUser = Cookies.get("userdb");
  //   if (encryptedUser) {
  //     try {
  //       const bytes = CryptoJS.AES.decrypt(encryptedUser, ENCRYPTION_KEY);
  //       const decryptedUser = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  //       console.log(decryptedUser);
  //       console.log(Object.values(decryptedUser));
  //     } catch (error) {
  //       console.error("Error parsing user data:", error);
  //     }
  //   }
  // }, []);

  useEffect(() => {
    // Load and decrypt user from cookie when component mounts
    const encryptedUser = Cookies.get("userdb");
    if (encryptedUser) {
      try {
        const bytes = CryptoJS.AES.decrypt(encryptedUser, ENCRYPTION_KEY);
        const decryptedUser = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        setuserdb(decryptedUser);
        console.log(decryptedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (userdb) {
      console.log(userdb);
      const encryptedUser = CryptoJS.AES.encrypt(
        JSON.stringify(userdb),
        ENCRYPTION_KEY
      ).toString();
      Cookies.set("userdb", encryptedUser, { expires: 7 });
      // Cookie will expire in 7 days
    } else {
      Cookies.remove("userdb"); // Remove the user cookie if user is null
    }
  }, [userdb]);

  return (
    <div>
      <AuthContextProvider userdb={userdb}>
        <Navbar userdb={userdb} updateuserdb={updateuserdb} />
        <Routes>
          <Route
            path="/"
            element={<HomePage userdb={userdb} updateuserdb={updateuserdb} />}
          />
          <Route
            path="/signin"
            element={<LoginPage userdb={userdb} updateuserdb={updateuserdb} />}
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/account"
            element={
              <Protected userdb={userdb} updateuserdb={updateuserdb}>
                <Account />
              </Protected>
            }
          />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
