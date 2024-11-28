CREATE DATABASE IF NOT EXISTS cartsy_db;

USE cartsy_db;

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO products (name, description, price, image)
VALUES
('Product 1', 'Description for Product 1', 19.99, 'image1.jpg'),
('Product 2', 'Description for Product 2', 29.99, 'image2.jpg'),
('Product 3', 'Description for Product 3', 39.99, 'image3.jpg');
