import { DatabaseSync } from "node:sqlite";
const db = new DatabaseSync(":memory:");

// Execute SQL statements from strings
db.exec(`
    CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )
`);

db.exec(`
    CREATE TABLE orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        date TEXT,
        total REAL,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )
`);

db.exec(`
    CREATE TABLE order_item (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER,
        title TEXT NOT NULL,
        image TEXT,
        price REAL NOT NULL,
        quantity INTEGER NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(id)
    )
`);

export default db;
