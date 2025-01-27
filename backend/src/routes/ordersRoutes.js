import { poolPromise } from "../db.js";
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// Get all orders history
router.get("/orders", async (req, res) => {
  const userId = req.userId;

  try {
    const [rows] = await poolPromise.query(
      `
      SELECT * FROM orders WHERE user_id = ?
      `,
      [userId]
    );
    const orderId = rows[0].id;

    if (!(rows.length > 0)) {
      return res.json({ message: "User has 0 orders" });
    }

    const [results] = await poolPromise.query(
      `
    SELECT * FROM order_items WHERE order_id = ?
    `,
      [orderId]
    );

    res.json(results);
  } catch (error) {
    console.log(err.message);
    res.sendStatus(503);
  }
  // res.json({ message: "działa" });
});

// Save new order in orders history
router.post("/orders", async (req, res) => {
  const { items, total } = req.body;
  const userId = req.userId;

  const connection = await poolPromise.getConnection(); // Pobieranie połączenia
  try {
    await connection.beginTransaction(); // Rozpoczęcie transakcji

    // Wstawienie zamówienia
    const [results] = await connection.query(
      `INSERT INTO orders (user_id, total) VALUES (?, ?)`,
      [userId, total]
    );
    const orderId = results.insertId;

    // Przygotowanie danych do masowego wstawiania
    const orderItems = items.map((item) => [
      orderId,
      item.title,
      item.image,
      item.price,
      item.quantity,
    ]);
    const placeholders = items.map(() => `(?,?,?,?,?)`).join(",");
    const query = `
      INSERT INTO order_items ( order_id, title, image, price, quantity)
      VALUES ${placeholders}
    `;
    const flatOrderItems = orderItems.flat();
    await connection.query(query, flatOrderItems);

    // Zatwierdzenie transakcji
    await connection.commit();

    res.json({ message: "Order successfully added", orderId });
  } catch (error) {
    await connection.rollback(); // Cofnięcie zmian w razie błędu
    console.error("Error saving order:", error.message);
    res.status(500).json({ error: "Failed to save order" });
  } finally {
    connection.release(); // Zwrócenie połączenia do puli
  }
});
// router.post("/orders", async (req, res) => {
//   const { items, total } = req.body;
//   const userId = req.userId;
//   // res.json(items);
//     try {
//       const [results] = await poolPromise.query(
//         `
//   INSERT INTO orders (user_id, total) VALUES (?, ?)
//   `,
//         [userId, total]
//       );
//       const orderId = results.insertId;

//       // Preparing data for mass insertion into the `order_item` table
//       const orderItems = items.map((item) => [
//         userId,
//         orderId,
//         item.title,
//         item.image,
//         item.price,
//         item.quantity,
//       ]);

//       // Inserting multiple items into the `order_item` table
//       const placeholders = items.map(() => `(?,?,?,?,?,?)`).join(",");

//       const query = `
//       INSERT INTO order_item (user_id, order_id, title, image, price, quantity)
//       VALUES ${placeholders}
//     `;

//       const flatOrderItems = orderItems.flat(); // Flattening an array (SQL requires one dimension)
//       await poolPromise.query(query, flatOrderItems);

//       res.json({ message: "Order successfully added", orderId });
//     } catch (error) {
//       console.error("Error saving order:", error.message);
//       res.status(500).json({ error: "Failed to save order" });
//     }
// });

export default router;
