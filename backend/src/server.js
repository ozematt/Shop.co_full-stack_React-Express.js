const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();
const PORT = 3005;

// Konfiguracja połączenia z bazą danych MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DATABASE || "test",
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: " + err.stack);
    return;
  }
  console.log("Connected to MySQL as ID " + db.threadId);
});

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
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
