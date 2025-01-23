const usersTable = `
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTO_INCREMENT,
          username VARCHAR(50) UNIQUE,
          password VARCHAR(50)
        )
      `;

const ordersTable = `
        CREATE TABLE IF NOT EXISTS orders (
          id INTEGER PRIMARY KEY AUTO_INCREMENT,
          user_id INTEGER,
          date DATE,
          total FLOAT NOT NULL,
          FOREIGN KEY(user_id) REFERENCES users(id)
        )
      `;

const orderItemTable = `
        CREATE TABLE IF NOT EXISTS order_item (
          id INTEGER PRIMARY KEY AUTO_INCREMENT,
          order_id INTEGER,
          user_id INTEGER,
          title VARCHAR(255) NOT NULL,
          image VARCHAR(255) NOT NULL,
          price FLOAT NOT NULL,
          quantity INTEGER NOT NULL,
          FOREIGN KEY (order_id) REFERENCES orders(id),
          FOREIGN KEY (user_id) REFERENCES users(id)
        )
      `;

export { usersTable, ordersTable, orderItemTable };
