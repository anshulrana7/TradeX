import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";

function AuthenticatedHome() {
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3002";
  const landingUrl = process.env.REACT_APP_LANDING_URL || "http://localhost:3000";
  const [isAuthenticated, setIsAuthenticated] = useState(null);

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

  useEffect(() => {
    if (isAuthenticated === false) {
      window.location.replace(`${landingUrl}/signin`);
    }
  }, [isAuthenticated, landingUrl]);

  if (isAuthenticated !== true) return <p>Checking your session...</p>;

  return <Home />;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<AuthenticatedHome />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
