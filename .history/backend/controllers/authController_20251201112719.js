// controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail, findUserById } from "../models/userModel.js";

const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);
const JWT_SECRET = process.env.JWT_SECRET;

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "Missing fields" });

    // check existing
    const existing = await findUserByEmail(email);
    if (existing) return res.status(409).json({ message: "Email already registered" });

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const { insertId } = await createUser(name, email, passwordHash);

    return res.status(201).json({ success: true, userId: insertId });
  } catch (err) {
    console.error("registerUser error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Missing fields" });

    const user = await findUserByEmail(email);
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1d" });

    return res.json({ token });
  } catch (err) {
    console.error("loginUser error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await findUserById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json({ user });
  } catch (err) {
    console.error("getProfile error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
