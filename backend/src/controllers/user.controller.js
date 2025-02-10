import { poolPromise } from "../db.js";

export const getUser = async (req, res, next) => {
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
  } catch (error) {
    console.log(error.message);
    next(error);
    res.sendStatus(503);
  }
};
