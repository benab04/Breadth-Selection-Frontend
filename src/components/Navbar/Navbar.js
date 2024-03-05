import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { UserAuth } from "../../context/AuthContext";

function Navbar({ userdb, updateuserdb }) {
  const { logOut, user } = UserAuth();
  const [URL, setURL] = useState("");
  const [userName, setUserName] = useState("");
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const base_url = process.env.REACT_APP_BASE_URL;

  const handleSignOut = async () => {
    if (userdb == null) {
      try {
        await logOut();
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await fetch(base_url + "logout/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add any additional headers if needed
          },
          // You can pass any data if required, but typically logout requests don't need any data in the body
          body: JSON.stringify(userdb),
        });
        if (response.status == 200) {
          updateuserdb(null);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    if (user?.displayName != null) {
      setUserName(user.displayName);
    }
    if (user?.photoURL != null) {
      setURL(user.photoURL);
    }

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, user]);

  return (
    <div>
      <nav
        className={`navbar navbar-expand-lg bg-body-tertiary fixed-top ${
          visible ? "nav-visible" : "nav-hidden"
        }`}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            {/* <img className="logo-img" src="#" alt="marico-logo" /> */}
            <h3 className="nav-title">
              <span style={{ color: "#4361ee" }}>Hack</span>athon
            </h3>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                <span style={{ color: "#4361ee" }}>Hack</span>athon
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">
                    Home
                  </a>
                </li>
                {user?.displayName || userdb != null ? (
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      aria-current="page"
                      href="/account"
                      onClick={() => updateuserdb(userdb)}
                    >
                      Account
                    </a>
                  </li>
                ) : null}

                {/* <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Dropdown
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </li> */}
              </ul>
              {user?.displayName || userdb != null ? (
                <a
                  className="btn btn-outline-success"
                  role="button"
                  onClick={handleSignOut}
                >
                  <img
                    className="logged-in-thumb"
                    src={URL}
                    referrerPolicy="no-referrer"
                  />
                  Logout
                </a>
              ) : (
                <a
                  className="btn btn-outline-success"
                  href="/signin"
                  role="button"
                  // target="_blank"
                  rel="nonreferrer"
                >
                  Login
                </a>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
