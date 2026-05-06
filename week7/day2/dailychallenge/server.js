// server.js
require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const { Pool } = require("pg");

const app = express();
const PORT = 3000;
const SALT_ROUNDS = 10;

// ── CHANGE THESE TO YOUR POSTGRESQL DETAILS ──────────────
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "5897",
  port: 5432,
});
// ─────────────────────────────────────────────────────────

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function setupTables() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id         SERIAL PRIMARY KEY,
      email      TEXT NOT NULL UNIQUE,
      username   TEXT NOT NULL UNIQUE,
      first_name TEXT NOT NULL,
      last_name  TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS hashpwd (
      id       SERIAL PRIMARY KEY,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )
  `);
  console.log("Tables ready.");
}

// POST /register
app.post("/register", async (req, res) => {
  const { email, username, first_name, last_name, password } = req.body;
  if (!email || !username || !first_name || !last_name || !password) {
    return res.status(400).json({ error: "All fields are required: email, username, first_name, last_name, password" });
  }
  const client = await pool.connect();
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    await client.query("BEGIN");
    const result = await client.query(
      "INSERT INTO users (email, username, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *",
      [email, username, first_name, last_name]
    );
    await client.query(
      "INSERT INTO hashpwd (username, password) VALUES ($1, $2)",
      [username, hashedPassword]
    );
    await client.query("COMMIT");
    res.status(201).json({ message: "User registered successfully", user: result.rows[0] });
  } catch (err) {
    await client.query("ROLLBACK");
    if (err.code === "23505") return res.status(409).json({ error: "Email or username already exists" });
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  } finally {
    client.release();
  }
});

// POST /login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "username and password are required" });
  }
  try {
    const userResult = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    if (userResult.rows.length === 0) return res.status(401).json({ error: "Invalid username or password" });

    const hashResult = await pool.query("SELECT password FROM hashpwd WHERE username = $1", [username]);
    if (hashResult.rows.length === 0) return res.status(401).json({ error: "Invalid username or password" });

    const isMatch = await bcrypt.compare(password, hashResult.rows[0].password);
    if (!isMatch) return res.status(401).json({ error: "Invalid username or password" });

    const user = userResult.rows[0];
    res.json({ message: "Login successful", user: { id: user.id, email: user.email, username: user.username, first_name: user.first_name, last_name: user.last_name } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
});

// GET /users
app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT id, email, username, first_name, last_name, created_at FROM users ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// GET /users/:id
app.get("/users/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT id, email, username, first_name, last_name, created_at FROM users WHERE id = $1", [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "User not found" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

// PUT /users/:id
app.put("/users/:id", async (req, res) => {
  const { email, first_name, last_name } = req.body;
  if (!email || !first_name || !last_name) {
    return res.status(400).json({ error: "email, first_name, and last_name are required" });
  }
  try {
    const result = await pool.query(
      "UPDATE users SET email = $1, first_name = $2, last_name = $3 WHERE id = $4 RETURNING id, email, username, first_name, last_name",
      [email, first_name, last_name, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User updated successfully", user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update user" });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start
setupTables()
  .then(() => app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)))
  .catch((err) => { console.error("DB connection failed:", err.message); process.exit(1); });