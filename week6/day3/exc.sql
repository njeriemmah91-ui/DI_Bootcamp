CREATE TABLE language (
    language_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE film (
    film_id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    language_id INT REFERENCES language(language_id),
    length INT,
    rating VARCHAR(10),
    replacement_cost NUMERIC
);

CREATE TABLE actor (
    actor_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100)
);

CREATE TABLE film_actor (
    film_id INT REFERENCES film(film_id),
    actor_id INT REFERENCES actor(actor_id)
);

CREATE TABLE customer (
    customer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100)
);

CREATE TABLE rental (
    rental_id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customer(customer_id),
    film_id INT REFERENCES film(film_id),
    rental_date DATE,
    return_date DATE
);

CREATE TABLE payment (
    payment_id SERIAL PRIMARY KEY,
    rental_id INT REFERENCES rental(rental_id),
    amount NUMERIC
);

INSERT INTO language (name) VALUES ('English'), ('French'), ('Spanish');

INSERT INTO film (title, description, language_id, length, rating, replacement_cost)
VALUES
('Sumo Champion', 'A film about a sumo wrestler', 1, 120, 'PG', 25.99),
('Boat Adventure', 'Story about a boat journey', 1, 90, 'R', 40.00),
('Short Documentary', 'A short documentary film', 1, 55, 'R', 15.50);

INSERT INTO actor (first_name, last_name)
VALUES
('PENELOPE', 'MONROE'),
('MATTHEW', 'MAHAN');

INSERT INTO film_actor (film_id, actor_id)
VALUES (1,1), (2,2);

INSERT INTO customer (first_name, last_name)
VALUES ('MATTHEW', 'MAHAN');

INSERT INTO rental (customer_id, film_id, rental_date, return_date)
VALUES
(1,1,'2005-07-30',NULL),
(1,2,'2005-07-29','2005-08-01');

INSERT INTO payment (rental_id, amount)
VALUES (1,5.00),(2,6.50);

SELECT * FROM language;

SELECT f.title, f.description, l.name AS language
FROM film f
JOIN language l ON f.language_id = l.language_id;

SELECT f.title, f.description, l.name AS language
FROM language l
LEFT JOIN film f ON f.language_id = l.language_id;

SELECT COUNT(*) FROM rental WHERE return_date IS NULL;

SELECT f.title, p.amount, r.rental_date
FROM rental r
JOIN payment p ON r.rental_id = p.rental_id
JOIN film f ON r.film_id = f.film_id
WHERE r.return_date IS NULL
ORDER BY p.amount DESC;

SELECT f.title
FROM film f
JOIN film_actor fa ON f.film_id = fa.film_id
JOIN actor a ON fa.actor_id = a.actor_id
WHERE f.description ILIKE '%sumo%'
AND a.first_name = 'PENELOPE'
AND a.last_name = 'MONROE';

SELECT title, length, rating
FROM film
WHERE length < 60 AND rating = 'R';

SELECT title, replacement_cost
FROM film
WHERE title ILIKE '%boat%'
OR description ILIKE '%boat%'
ORDER BY replacement_cost DESC;