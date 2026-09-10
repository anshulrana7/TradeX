import React, { useState } from "react";

function Signup() {
	const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3002";
	const dashboardUrl = process.env.REACT_APP_DASHBOARD_URL || "http://localhost:3001";

	const handleSubmit = (event) => {
		event.preventDefault();
		setError("");
		setIsSubmitting(true);

		const form = event.currentTarget;
		const email = form.elements.email.value.trim();
		const password = form.elements.password.value;
		const confirmPassword = form.elements.confirmPassword.value;

		if (password !== confirmPassword) {
			setError("Passwords do not match.");
			setIsSubmitting(false);
			return;
		}

		fetch(`${apiUrl}/auth/signup`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		})
			.then(async (response) => {
				const data = await response.json();
				if (!response.ok) throw new Error(data.message || "Unable to create your account.");
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
					<h1 className="mt-5">Create your account</h1>
					<p>Start investing with a simple and secure trading account.</p>
					<form className="text-start mx-auto" style={{ maxWidth: "420px" }} onSubmit={handleSubmit}>
						<label className="form-label" htmlFor="email">
							Email address
						</label>
						<input
							className="form-control mb-3"
							id="email"
							name="email"
							type="email"
							placeholder="you@example.com"
							required
						/>
						<label className="form-label" htmlFor="password">
							Password
						</label>
						<input className="form-control mb-3" id="password" name="password" type="password" minLength="8" required />
						<label className="form-label" htmlFor="confirmPassword">
							Confirm password
						</label>
						<input className="form-control mb-3" id="confirmPassword" name="confirmPassword" type="password" minLength="8" required />
						{error && <div className="alert alert-danger py-2">{error}</div>}
						<button className="btn btn-primary w-100" type="submit" disabled={isSubmitting}>
							{isSubmitting ? "Creating account..." : "Sign up"}
						</button>
					</form>
				</div>
			</div>
		</main>
	);
}

export default Signup;
