import { poolPromise } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

export const register = async (req, res, next) => {
  const { username, password } = req.body;

  const salt = bcrypt.getSalt(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  // save the new user
  try {
    const [results] = await poolPromise.query(
      `INSERT INTO users (username, password) VALUES (?, ?)`,
      [username, hashedPassword]
    );
    // create a token
    const token = jwt.sign({ id: results.insertId }, JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(201).json({ token });
  } catch (error) {
    console.log(error.message);
    next(error);
    res.sendStatus(503);
  }
};

export const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const [rows] = await poolPromise.query(
      `
        SELECT *
        FROM users
        WHERE username = ?`,
      [username]
    );
    const user = rows[0];
    // if we cannot find a user associated with that username, return out of the function
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    // if the password does not match, return out of the function
    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid password" });
    }
    // then we have a successful authentication
    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: "24h",
    });
    res.status(200).json({ token });
  } catch (error) {
    console.log(err.message);
    next(error);
    res.sendStatus(503);
  }
};
