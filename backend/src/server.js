import express from "express";
import { connectToDatabase } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.BACKEND_PORT || 3005;

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.use("/api", authRoutes);

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
