import express from "express";
import cors from "cors";
import { connectToDatabase } from "./db.js";
import authRoutes from "./routes/authRoutes.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.BACKEND_PORT || 3005;

// Middleware
app.use(cors());
app.use(express.json());
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

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
