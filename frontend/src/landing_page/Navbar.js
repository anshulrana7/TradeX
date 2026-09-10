import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const dashboardUrl = process.env.REACT_APP_DASHBOARD_URL || "http://localhost:3001";
  const signinUrl = "/signin";
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3002";
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetch(`${apiUrl}/auth/me`, { credentials: "include" })
      .then((response) => {
        if (!response.ok) throw new Error("Invalid token");
        setIsAuthenticated(true);
      })
      .catch(() => {
        setIsAuthenticated(false);
      });
  }, [apiUrl]);

  const handleLogout = () => {
    fetch(`${apiUrl}/auth/logout`, { method: "POST", credentials: "include" })
      .finally(() => window.location.assign(signinUrl));
  };

  return (
    <nav
      className="navbar navbar-expand-lg sticky-top border-bottom"
      style={{ backgroundColor: "#FFF" }}
    >
      <div className="container p-2">
        <Link className="navbar-brand" to="/">
          <img
            src="media/images/logo.svg"
            style={{ width: "25%" }}
            alt="Logo"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="d-flex" role="search">
            <ul className="navbar-nav mb-lg-0">
              {isAuthenticated && (
                <>
                  <li className="nav-item">
                    <a className="nav-link active" href={dashboardUrl} target="_self">
                      Dashboard
                    </a>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link active border-0 bg-transparent" type="button" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </>
              )}
              <li className="nav-item">
                <Link className="nav-link active" to="/signup">
                  Signup
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/signin">
                  Sign in
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/product">
                  Product
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/pricing">
                  Pricing
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/support">
                  Support
                </Link>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
