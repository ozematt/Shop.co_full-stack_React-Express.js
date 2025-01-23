import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { poolPromise } from "../config/db.js";

import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// Register a new user endpoint /auth/register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 8);

  // save the new user
  try {
    const [result] = await poolPromise.query(
      `INSERT INTO users (username, password) VALUES (?, ?)`,
      [username, hashedPassword]
    );

    // create a token
    const token = jwt.sign({ id: result.insertId }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(503);
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  try {
    const [result] = poolPromise.query(
      `SELECT * FROM users WHERE username = ?`,
      [username]
    );
    // if we cannot find a user associated with that username, return out of the function
    if (!result) {
      return res.status(404).send({ message: "User not found" });
    }

    const passwordIsValid = bcrypt.compareSync(password, result.password);
    // if the password does not match, return out of the function
    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid password" });
    }

    console.log(user);
    // then we have a successful authentication
    const token = jwt.sign({ id: result.insertId }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(503);
  }
});

export default router;
