import React from "react";

function Signup() {
	return (
		<main className="container p-5 mb-5">
			<div className="row justify-content-center text-center">
				<div className="col-md-7">
					<h1 className="mt-5">Create your account</h1>
					<p>Start investing with a simple and secure trading account.</p>
					<form className="text-start mx-auto" style={{ maxWidth: "420px" }}>
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
						<button className="btn btn-primary w-100" type="submit">
							Sign up
						</button>
					</form>
				</div>
			</div>
		</main>
	);
}

export default Signup;
