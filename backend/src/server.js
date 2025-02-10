import { PORT } from "./config/env.js";
import express from "express";
import cors from "cors";
import { connectToDatabase } from "./db.js";
import errorMiddleware from "./middleware/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import ordersRoutes from "./routes/orders.routes.js";
import userRoutes from "./routes/user.routes.js";
import authMiddleware from "./middleware/auth.middleware.js";
// import cookieParser from "cookie-parser";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.use("/api", authRoutes);
app.use("/api", authMiddleware, ordersRoutes);
app.use("/api", authMiddleware, userRoutes);

app.use(errorMiddleware); //middleware for handling errors

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
