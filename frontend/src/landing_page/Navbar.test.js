import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";

function renderNavbar() {
  return render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
}

test("checks the session with credentials and keeps the dashboard URL token-free", async () => {
  global.fetch = jest.fn().mockResolvedValue({ ok: true });

  renderNavbar();

  await waitFor(() => expect(global.fetch).toHaveBeenCalledWith(
    "http://localhost:3002/auth/me",
    { credentials: "include" }
  ));

  const dashboardLink = await screen.findByRole("link", { name: "Dashboard" });
  expect(dashboardLink.getAttribute("href")).toBe("http://localhost:3001");
  expect(dashboardLink.href).not.toContain("token=");
});
