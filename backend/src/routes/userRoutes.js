import { poolPromise } from "../db.js";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Get user email
router.get("/user", async (req, res) => {
  const userId = req.userId;

  try {
    const [results] = await poolPromise.query(
      `
    SELECT * FROM users WHERE id = ?
    `,
      [userId]
    );

    const userEmail = results[0].username;

    res.json(userEmail);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(503);
  }
});

export default router;
