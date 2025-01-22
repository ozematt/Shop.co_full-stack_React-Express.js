// const express = require("express");
import express from "express";
// const mysql = require("mysql2");
// require("dotenv").config();

const app = express();
const PORT = 3005;

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  // db.query("SELECT * FROM users", (err, results) => {
  //   if (err) {
  //     console.error("Error executing query: " + err.stack);
  //     res.status(500).send("Error fetching users");
  //     return;
  //   }
  //   res.json(results);
  // });
});
////
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
