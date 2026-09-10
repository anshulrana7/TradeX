const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/UserModel");

const router = express.Router();
const jwtSecret = process.env.JWT_SECRET || "development-secret-change-me";
const sessionCookie = "tradexSession";
const cookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  maxAge: 24 * 60 * 60 * 1000,
};
const clearCookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
};

function getSessionToken(req) {
  const cookies = req.headers.cookie || "";
  const session = cookies.split(";").find((cookie) => cookie.trim().startsWith(`${sessionCookie}=`));
  return session ? decodeURIComponent(session.trim().slice(sessionCookie.length + 1)) : null;
}

function createToken(user) {
  return jwt.sign({ sub: user._id.toString(), email: user.email }, jwtSecret, {
    expiresIn: "1d",
  });
}

function sendAuthResponse(res, user) {
  res.cookie(sessionCookie, createToken(user), cookieOptions);
  res.json({ user: { id: user._id, email: user.email } });
}

router.post("/signup", async (req, res) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters." });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "An account with this email already exists." });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await UserModel.create({ email, passwordHash });

    return sendAuthResponse(res.status(201), user);
  } catch (error) {
    console.error("Signup failed:", error);
    return res.status(500).json({ message: "Unable to create your account." });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");
    const user = await UserModel.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    return sendAuthResponse(res, user);
  } catch (error) {
    console.error("Signin failed:", error);
    return res.status(500).json({ message: "Unable to sign in right now." });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie(sessionCookie, clearCookieOptions);
  return res.status(204).end();
});

router.get("/me", async (req, res) => {
  try {
    const token = getSessionToken(req);

    if (!token) {
      return res.status(401).json({ message: "Authentication required." });
    }

    const payload = jwt.verify(token, jwtSecret);
    const user = await UserModel.findById(payload.sub).select("_id email");

    if (!user) {
      return res.status(401).json({ message: "Authentication required." });
    }

    return res.json({ user });
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
});

module.exports = { authRouter: router };
