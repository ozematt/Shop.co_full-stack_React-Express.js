import { createOrder, getOrders } from "../controllers/order.controller.js";
import express from "express";

const orderRouter = express.Router();

// Get all user orders history
orderRouter.get("/orders", getOrders);

// Save new order in orders history
orderRouter.post("/orders", createOrder);

export default orderRouter;
