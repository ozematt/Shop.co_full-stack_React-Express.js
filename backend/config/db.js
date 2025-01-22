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

import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost", // Host, w tym przypadku localhost, bo aplikacja i baza są na tym samym hoście
  user: "root", // Użytkownik bazy danych
  password: "root", // Hasło użytkownika
  database: "test_db", // Nazwa bazy danych
  port: 3306, // Port, na którym działa MySQL w kontenerze
});

db.connect((err) => {
  if (err) {
    console.error("Nie udało się połączyć z bazą danych:", err);
    process.exit(1);
  }
  console.log("Połączono z bazą danych MySQL!");
});

module.exports = db;
