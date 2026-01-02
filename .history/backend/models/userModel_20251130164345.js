// models/userModel.js
import { db } from "../config/db.js";

export const createUser = async (name, email, passwordHash) => {
  const [result] = await db.exx(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, passwordHash]
  );
  return { insertId: result.insertId };
};

export const findUserByEmail = async (email) => {
  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0];
};

export const findUserById = async (id) => {
  const [rows] = await db.query("SELECT id, name, email, created_at FROM users WHERE id = ?", [id]);
  return rows[0];
};
