CREATE DATABASE smartlearning;
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE,
  password TEXT,
  role TEXT
);

CREATE TABLE assignments (
  id SERIAL PRIMARY KEY,
  title TEXT,
  description TEXT,
  due_date TIMESTAMP,
  teacher_id INT
);

CREATE TABLE submissions (
  id SERIAL PRIMARY KEY,
  assignment_id INT,
  student_id INT,
  file_path TEXT
);