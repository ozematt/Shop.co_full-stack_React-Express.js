import { poolPromise } from "../db.js";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// Get all user orders history
router.get("/orders", async (req, res) => {
  const userId = req.userId;

  try {
    const [rows] = await poolPromise.query(
      `
      SELECT 
        o.id AS orderId, 
        o.total, 
        o.created_at, 
        oi.id AS itemId,
        oi.product_name, 
        oi.image,
        oi.quantity, 
        oi.price
      FROM orders AS o
      JOIN order_items AS oi ON o.id = oi.order_id
      WHERE o.user_id = ?
      ORDER BY o.created_at DESC
      `,
      [userId]
    );

    if (rows.length === 0) {
      return res.json({ message: "User has 0 orders" });
    }

    // Grouping results
    const ordersMap = rows.reduce((map, row) => {
      if (!map.has(row.orderId)) {
        map.set(row.orderId, {
          orderId: row.orderId,
          total: row.total,
          created_at: row.created_at,
          items: [],
        });
      }

      map.get(row.orderId).items.push({
        itemId: row.itemId,
        product_name: row.product_name,
        image: row.image,
        quantity: row.quantity,
        price: row.price,
      });

      return map;
    }, new Map());

    const ordersWithItems = Array.from(ordersMap.values());
    res.json(ordersWithItems);
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(503).json({ error: "Failed to fetch orders" });
  }
});

// Save new order in orders history
router.post("/orders", async (req, res) => {
  const { items, total } = req.body;
  const userId = req.userId;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "Invalid items format" });
  }

  for (const item of items) {
    if (
      !item.product_name ||
      typeof item.price !== "number" ||
      item.quantity <= 0
    ) {
      return res.status(400).json({ error: "Invalid item data" });
    }
  }

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
      item.product_name,
      item.image,
      item.price,
      item.quantity,
    ]);

    // Inserting multiple items into the `order_item` table
    const placeholders = items.map(() => `(?,?,?,?,?)`).join(",");
    const query = `
      INSERT INTO order_items ( order_id, product_name, image, price, quantity)
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
