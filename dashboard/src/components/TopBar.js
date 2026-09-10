import React from "react";

import Menu from "./Menu";

const TopBar = () => {
  const landingUrl = process.env.REACT_APP_LANDING_URL || "http://localhost:3000";
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3002";

  const handleLogout = () => {
    fetch(`${apiUrl}/auth/logout`, { method: "POST", credentials: "include" })
      .finally(() => window.location.assign(`${landingUrl}/signin`));
  };

  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="nifty">
          <p className="index">NIFTY 50</p>
          <p className="index-points">{100.2} </p>
          <p className="percent"> </p>
        </div>
        <div className="sensex">
          <p className="index">SENSEX</p>
          <p className="index-points">{100.2}</p>
          <p className="percent"></p>
        </div>
      </div>

      <div className="topbar-actions">
        <Menu />
        <button type="button" className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default TopBar;
