INSERT INTO users (username, password) VALUES ('testuser@example.com', 'password123');

INSERT INTO orders (user_id, total) VALUES (1, 100.20);

INSERT INTO order_items (order_id, title, quantity, price) VALUES (1, 'Product A', 2, 20.00);
