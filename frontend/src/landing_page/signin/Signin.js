import React, { useState } from "react";
import { Link } from "react-router-dom";

function Signin() {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3002";
  const dashboardUrl = process.env.REACT_APP_DASHBOARD_URL || "http://localhost:3001";

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const form = event.currentTarget;
    fetch(`${apiUrl}/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email: form.elements.email.value.trim(),
        password: form.elements.password.value,
      }),
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Unable to sign in.");
        window.location.assign(dashboardUrl);
      })
      .catch((requestError) => {
        setError(requestError.message);
        setIsSubmitting(false);
      });
  };

  return (
    <main className="container p-5 mb-5">
      <div className="row justify-content-center text-center">
        <div className="col-md-7">
          <h1 className="mt-5">Sign in to your account</h1>
          <p>Use your TradeX credentials to continue.</p>
          <form className="text-start mx-auto" style={{ maxWidth: "420px" }} onSubmit={handleSubmit}>
            <label className="form-label" htmlFor="email">Email address</label>
            <input className="form-control mb-3" id="email" name="email" type="email" required />
            <label className="form-label" htmlFor="password">Password</label>
            <input className="form-control mb-3" id="password" name="password" type="password" required />
            {error && <div className="alert alert-danger py-2">{error}</div>}
            <button className="btn btn-primary w-100" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </form>
          <p className="mt-3">New to TradeX? <Link to="/signup">Create an account</Link></p>
        </div>
      </div>
    </main>
  );
}

export default Signin;
