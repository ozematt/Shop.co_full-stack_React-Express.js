// import { DatabaseSync } from "node:sqlite";
// const db = new DatabaseSync(":memory:");

// // Execute SQL statements from strings
// db.exec(`
//     CREATE TABLE users (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         username VARCHAR(255) UNIQUE,
//         password VARCHAR(255)
//     )
// `);

// db.exec(`
//     CREATE TABLE orders (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         user_id INTEGER,
//         date TEXT,
//         total REAL,
//         FOREIGN KEY(user_id) REFERENCES users(id)
//     )
// `);

// db.exec(`
//     CREATE TABLE order_item (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         order_id INTEGER,
//         title TEXT NOT NULL,
//         image TEXT,
//         price REAL NOT NULL,
//         quantity INTEGER NOT NULL,
//         FOREIGN KEY (order_id) REFERENCES orders(id)
//     )
// `);

// export default db;

const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();
const port = 3000;

// Konfiguracja połączenia z bazą danych MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DATABASE || "test",
});

// Sprawdzenie połączenia z MySQL
db.connect((err) => {
  if (err) {
    console.error("Błąd połączenia z bazą danych:", err);
    process.exit(1); // Wyjście, jeśli połączenie nie działa
  }
  console.log("Połączono z bazą danych MySQL!");
});

// Middleware do parsowania JSON
app.use(express.json());

// Endpointy
// app.get('/users', (req, res) => {
//     db.query('SELECT * FROM users', (err, results) => {
//         if (err) {
//             console.error('Błąd zapytania:', err);
//             res.status(500).json({ error: 'Internal Server Error' });
//         } else {
//             res.json(results);
//         }
//     });
// });

// app.post('/users', (req, res) => {
//     const { username, password } = req.body;
//     const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
//     db.query(query, [username, password], (err, results) => {
//         if (err) {
//             console.error('Błąd zapytania:', err);
//             res.status(500).json({ error: 'Internal Server Error' });
//         } else {
//             res.status(201).json({ id: results.insertId, username, password });
//         }
//     });
// });

// Uruchomienie serwera
app.listen(port, () => {
  console.log(`Serwer działa na http://localhost:${port}`);
});
