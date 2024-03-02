import React, { useEffect, useState } from "react";
import "./Navbar.css";
// import logo_img from "../../assets/images/Marico_Logo.svg.png";
import { UserAuth } from "../../context/AuthContext";
function Navbar() {
  const { logOut, user } = UserAuth();
  const [URL, setURL] = useState("");
  const [userName, setUserName] = useState("");

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (user?.displayName != null) {
      setUserName(user.displayName);
    }
    if (user?.photoURL != null) {
      setURL(user.photoURL);
    }
  }, [user]);
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            {/* <img className="logo-img" src="#" alt="marico-logo" /> */}
            <h3>SELECT</h3>
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
                Offcanvas
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
                {user?.displayName ? (
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      aria-current="page"
                      href="/account"
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
              {user?.displayName ? (
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
                  target="_blank"
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