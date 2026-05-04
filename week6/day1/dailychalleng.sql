CREATE TABLE actors (
  actor_id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL
);
INSERT INTO actors (first_name, last_name) VALUES
('Tom', 'Hanks'),
('Emma', 'Watson'),
('Brad', 'Pitt'),
('Scarlett', 'Johansson');
SELECT COUNT(*) AS total_actors FROM actors;
INSERT INTO actors (first_name, last_name)
VALUES ('John', 'Doe');