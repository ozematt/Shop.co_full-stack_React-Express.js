import { poolPromise } from "../db.js";
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// Get all user orders history
router.get("/orders", async (req, res) => {
  const userId = req.userId;

  try {
    const [orders] = await poolPromise.query(
      `
      SELECT * FROM orders WHERE user_id = ?
      `,
      [userId]
    );
    // const orderId = orders[0].id;

    if (orders.length === 0) {
      return res.json({ message: "User has 0 orders" });
    }

    const ordersWithItems = await Promise.all(
      orders.map(async (order) => {
        const [items] = await poolPromise.query(
          `
          SELECT title, quantity, price, image
          FROM order_items
          WHERE order_id = ?
          `,
          [order.id]
        );

        return {
          orderId: order.id,
          total: order.total,
          date: order.date,
          items: items, // Produkty dla tego zamówienia
        };
      })
    );

    // Zwróć całą historię zamówień jako tablicę
    res.json(ordersWithItems);
  } catch (error) {
    console.error("Error while downloading orders:", error);
    res.status(500).json({ message: "A server error occurred" });
  }
});

// Save new order in orders history
router.post("/orders", async (req, res) => {
  const { items, total } = req.body;
  const userId = req.userId;

  const connection = await poolPromise.getConnection(); // Downloading connection
  try {
    await connection.beginTransaction(); // Starting the transaction

    // Inserting an order
    const [results] = await connection.query(
      `INSERT INTO orders (user_id, total) VALUES (?, ?)`,
      [userId, total]
    );
    const orderId = results.insertId;

    // Preparing data for mass insertion into the `order_item` table
    const orderItems = items.map((item) => [
      orderId,
      item.title,
      item.image,
      item.price,
      item.quantity,
    ]);

    // Inserting multiple items into the `order_item` table
    const placeholders = items.map(() => `(?,?,?,?,?)`).join(",");
    const query = `
      INSERT INTO order_items ( order_id, title, image, price, quantity)
      VALUES ${placeholders}
    `;
    const flatOrderItems = orderItems.flat(); // Flattening an array (SQL requires one dimension)
    await connection.query(query, flatOrderItems);

    // Transaction approval
    await connection.commit();

    res.json({ message: "Order successfully added", orderId });
  } catch (error) {
    await connection.rollback(); // Rollback in case of error
    console.error("Error saving order:", error.message);
    res.status(500).json({ error: "Failed to save order" });
  } finally {
    connection.release(); // Returning the connection to the pool
  }
});

export default router;
