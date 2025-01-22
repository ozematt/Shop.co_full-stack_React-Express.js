import express from "express";
import routes from "./src/routes/index.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.BACKEND_PORT || 3005;

// Middleware
app.use(express.json());

// Routes

// Trasy API
app.use("/api", routes);

////
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
