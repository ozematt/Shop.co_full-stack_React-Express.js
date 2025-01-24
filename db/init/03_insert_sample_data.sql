INSERT INTO users (username, password) VALUES ('testuser@example.com', 'password123');

INSERT INTO orders (user_id) VALUES (1);

INSERT INTO order_items (order_id, product_name, quantity, price) VALUES (1, 'Product A', 2, 20.00);
