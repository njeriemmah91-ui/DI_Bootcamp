const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: "postgres",
  password: "5897",
  host: "localhost",
  database: "smartlearning",
  port: 5432
});

const SECRET = "smartsecret";

const upload = multer({ dest: "uploads/" });

/* ---------------- REGISTER ---------------- */
app.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const result = await pool.query(
    "INSERT INTO users (name,email,password,role) VALUES ($1,$2,$3,$4) RETURNING *",
    [name, email, hash, role]
  );

  res.json(result.rows[0]);
});

/* ---------------- LOGIN ---------------- */
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await pool.query("SELECT * FROM users WHERE email=$1", [email]);

  if (user.rows.length === 0)
    return res.status(400).json({ msg: "User not found" });

  const valid = await bcrypt.compare(password, user.rows[0].password);

  if (!valid)
    return res.status(400).json({ msg: "Wrong password" });

  const token = jwt.sign(
    { id: user.rows[0].id, role: user.rows[0].role },
    SECRET
  );

  res.json({ token, user: user.rows[0] });
});

/* ---------------- AUTH ---------------- */
function auth(req, res, next) {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ msg: "No token" });

  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).json({ msg: "Invalid token" });
  }
}

/* ---------------- ASSIGNMENTS ---------------- */
app.post("/assignments", auth, async (req, res) => {
  const { title, description, due_date } = req.body;

  const result = await pool.query(
    "INSERT INTO assignments (title,description,due_date,teacher_id) VALUES ($1,$2,$3,$4) RETURNING *",
    [title, description, due_date, req.user.id]
  );

  res.json(result.rows[0]);
});

app.get("/assignments", auth, async (req, res) => {
  const result = await pool.query("SELECT * FROM assignments");
  res.json(result.rows);
});

/* ---------------- DELETE USER (ADMIN) ---------------- */
app.delete("/users/:id", auth, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ msg: "Forbidden" });

  await pool.query("DELETE FROM users WHERE id=$1", [req.params.id]);

  res.json({ msg: "User deleted" });
});

/* ---------------- FILE UPLOAD ---------------- */
app.post("/submit/:id", auth, upload.single("file"), async (req, res) => {
  await pool.query(
    "INSERT INTO submissions (assignment_id,student_id,file_path) VALUES ($1,$2,$3)",
    [req.params.id, req.user.id, req.file.path]
  );

  res.json({ msg: "Uploaded" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});