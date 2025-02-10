import { PORT } from "./config/env.js";
import express from "express";
import cors from "cors";
import { connectToDatabase } from "./db.js";
import { errorHandler } from "./utils/errorHandler.js";
import authRoutes from "./routes/auth.routes.js";
import ordersRoutes from "./routes/orders.routes.js";
import userRoutes from "./routes/user.routes.js";

import authMiddleware from "./middleware/auth.middleware.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.use("/api", authRoutes);
app.use("/api", authMiddleware, ordersRoutes);
app.use("/api", authMiddleware, userRoutes);

app.use(errorHandler); //middleware for handling errors

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Serwer działa na porcie ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error occurred with mysql connection. Error:", err);
    process.exit(0);
  });
