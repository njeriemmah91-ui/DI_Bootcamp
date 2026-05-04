-- =========================================
-- SETUP
-- =========================================

DROP TABLE IF EXISTS payment;
DROP TABLE IF EXISTS inventory;
DROP TABLE IF EXISTS film;
DROP TABLE IF EXISTS address;
DROP TABLE IF EXISTS customer;
DROP TABLE IF EXISTS city;
DROP TABLE IF EXISTS country;
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS customers;

-- Exercise 1 tables
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    price NUMERIC
);

CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50)
);

-- Minimal dvdrental-like tables
CREATE TABLE customer (
    customer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    create_date DATE
);

CREATE TABLE film (
    film_id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    description TEXT,
    release_year INT,
    rental_rate NUMERIC,
    length INT
);

CREATE TABLE address (
    address_id SERIAL PRIMARY KEY,
    address VARCHAR(100),
    phone VARCHAR(20),
    district VARCHAR(50)
);

CREATE TABLE inventory (
    inventory_id SERIAL PRIMARY KEY,
    film_id INT
);

CREATE TABLE payment (
    payment_id SERIAL PRIMARY KEY,
    customer_id INT,
    staff_id INT,
    amount NUMERIC,
    payment_date DATE
);

CREATE TABLE country (
    country_id SERIAL PRIMARY KEY,
    country VARCHAR(50)
);

CREATE TABLE city (
    city_id SERIAL PRIMARY KEY,
    city VARCHAR(50),
    country_id INT
);

-- =========================================
-- INSERT SAMPLE DATA
-- =========================================

INSERT INTO items (name, price) VALUES
('Laptop',1200), ('Phone',800), ('Mouse',25), ('Keyboard',75), ('Monitor',300);

INSERT INTO customers (first_name, last_name) VALUES
('Alice','Smith'), ('Bob','Brown'), ('Charlie','Davis'), ('David','Evans'), ('Eve','Johnson');

INSERT INTO customer (first_name, last_name, create_date) VALUES
('John','Doe','2023-01-01'),
('Jane','Doe','2023-02-01'),
('Alice','Wonder','2023-03-01');

INSERT INTO film (title, description, release_year, rental_rate, length) VALUES
('Matrix','Sci-fi movie',1999,2.99,120),
('Avatar','Fantasy movie',2009,3.99,150),
('Madagascar','Animation',2005,1.99,90);

INSERT INTO address (address, phone, district) VALUES
('123 Street','123456789','Texas'),
('456 Road','987654321','California');

INSERT INTO inventory (film_id) VALUES (1),(2);

INSERT INTO payment (customer_id, staff_id, amount, payment_date) VALUES
(1,1,10,'2023-05-01'),
(2,2,15,'2023-06-01');

INSERT INTO country (country) VALUES ('USA'),('Canada');

INSERT INTO city (city, country_id) VALUES
('New York',1), ('Toronto',2);

-- =========================================
-- EXERCISE 1 QUERIES
-- =========================================

SELECT * FROM items ORDER BY price ASC;

SELECT * FROM items WHERE price >= 80 ORDER BY price DESC;

SELECT first_name, last_name FROM customers ORDER BY first_name ASC LIMIT 3;

SELECT last_name FROM customers ORDER BY last_name DESC;

-- =========================================
-- EXERCISE 2 QUERIES
-- =========================================

SELECT * FROM customer;

SELECT first_name || ' ' || last_name AS full_name FROM customer;

SELECT DISTINCT create_date FROM customer;

SELECT * FROM customer ORDER BY first_name DESC;

SELECT film_id, title, description, release_year, rental_rate
FROM film ORDER BY rental_rate ASC;

SELECT address, phone FROM address WHERE district = 'Texas';

SELECT * FROM film WHERE film_id IN (15,150);

SELECT film_id, title, description, length, rental_rate
FROM film WHERE title = 'Matrix';

SELECT film_id, title, description, length, rental_rate
FROM film WHERE title LIKE 'Ma%';

SELECT * FROM film ORDER BY rental_rate ASC LIMIT 10;

SELECT * FROM film ORDER BY rental_rate ASC OFFSET 10 LIMIT 10;

SELECT c.first_name, c.last_name, p.amount, p.payment_date
FROM customer c
JOIN payment p ON c.customer_id = p.customer_id
ORDER BY c.customer_id;

SELECT * FROM film
WHERE film_id NOT IN (SELECT film_id FROM inventory);

SELECT city.city, country.country
FROM city
JOIN country ON city.country_id = country.country_id;

SELECT c.customer_id, c.first_name, c.last_name, p.amount, p.payment_date, p.staff_id
FROM customer c
JOIN payment p ON c.customer_id = p.customer_id
ORDER BY p.staff_id;


