const express = require("express");
const bcrypt  = require("bcrypt");
const fs      = require("fs");
const path    = require("path");

const app  = express();
const PORT = 3000;

const TASKS_FILE = path.join(__dirname, "data", "tasks.json");
const USERS_FILE = path.join(__dirname, "data", "users.json");
const SALT_ROUNDS = 10;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// ── Shared file helpers ───────────────────────────────────────────────────────
function readFile(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch (err) {
    throw new Error("Failed to read file: " + err.message);
  }
}

function writeFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    throw new Error("Failed to write file: " + err.message);
  }
}

function generateId() {
  return Date.now() + "-" + Math.random().toString(36).slice(2, 8);
}

// ═══════════════════════════════════════════════════════════════════════════════
//  TASK ROUTES  (/tasks)
// ═══════════════════════════════════════════════════════════════════════════════

function validateTaskCreate(body) {
  const errors = {};
  if (!body.title || typeof body.title !== "string" || !body.title.trim()) {
    errors.title = "Title is required and must be a non-empty string.";
  } else if (body.title.length > 200) {
    errors.title = "Title must be at most 200 characters.";
  }
  if (body.description !== undefined && typeof body.description !== "string") {
    errors.description = "Description must be a string.";
  }
  const validStatuses = ["pending", "in-progress", "completed"];
  if (body.status !== undefined && !validStatuses.includes(body.status)) {
    errors.status = 'Status must be one of: "pending", "in-progress", "completed".';
  }
  return Object.keys(errors).length ? errors : null;
}

function validateTaskUpdate(body) {
  const errors = {};
  if (body.title !== undefined) {
    if (typeof body.title !== "string" || !body.title.trim()) {
      errors.title = "Title must be a non-empty string.";
    } else if (body.title.length > 200) {
      errors.title = "Title must be at most 200 characters.";
    }
  }
  if (body.description !== undefined && typeof body.description !== "string") {
    errors.description = "Description must be a string.";
  }
  const validStatuses = ["pending", "in-progress", "completed"];
  if (body.status !== undefined && !validStatuses.includes(body.status)) {
    errors.status = 'Status must be one of: "pending", "in-progress", "completed".';
  }
  return Object.keys(errors).length ? errors : null;
}

// GET /tasks
app.get("/tasks", (req, res) => {
  try {
    const tasks = readFile(TASKS_FILE);
    res.json({ tasks, count: tasks.length });
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve tasks." });
  }
});

// GET /tasks/:id
app.get("/tasks/:id", (req, res) => {
  try {
    const tasks = readFile(TASKS_FILE);
    const task  = tasks.find(t => t.id === req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found." });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve task." });
  }
});

// POST /tasks
app.post("/tasks", (req, res) => {
  const errors = validateTaskCreate(req.body);
  if (errors) return res.status(400).json({ error: "Validation failed.", details: errors });

  try {
    const tasks = readFile(TASKS_FILE);
    const now   = new Date().toISOString();
    const task  = {
      id:          generateId(),
      title:       req.body.title.trim(),
      description: req.body.description || "",
      status:      req.body.status || "pending",
      createdAt:   now,
      updatedAt:   now,
    };
    tasks.push(task);
    writeFile(TASKS_FILE, tasks);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to create task." });
  }
});

// PUT /tasks/:id
app.put("/tasks/:id", (req, res) => {
  const { title, description, status } = req.body;
  if (title === undefined && description === undefined && status === undefined) {
    return res.status(400).json({ error: "Provide at least one field: title, description, or status." });
  }
  const errors = validateTaskUpdate(req.body);
  if (errors) return res.status(400).json({ error: "Validation failed.", details: errors });

  try {
    const tasks = readFile(TASKS_FILE);
    const index = tasks.findIndex(t => t.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "Task not found." });

    tasks[index] = {
      ...tasks[index],
      ...(title       !== undefined && { title: title.trim() }),
      ...(description !== undefined && { description }),
      ...(status      !== undefined && { status }),
      updatedAt: new Date().toISOString(),
    };
    writeFile(TASKS_FILE, tasks);
    res.json(tasks[index]);
  } catch (err) {
    res.status(500).json({ error: "Failed to update task." });
  }
});

// DELETE /tasks/:id
app.delete("/tasks/:id", (req, res) => {
  try {
    const tasks = readFile(TASKS_FILE);
    const index = tasks.findIndex(t => t.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "Task not found." });
    const [removed] = tasks.splice(index, 1);
    writeFile(TASKS_FILE, tasks);
    res.json({ message: "Task deleted successfully.", task: removed });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task." });
  }
});

// ═══════════════════════════════════════════════════════════════════════════════
//  USER ROUTES  (/register, /login, /users)
// ═══════════════════════════════════════════════════════════════════════════════

// POST /register
app.post("/register", async (req, res) => {
  const { name, lastName, email, username, password } = req.body;
  if (!name || !lastName || !email || !username || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }
  if (username.length < 3) {
    return res.status(400).json({ error: "Username must be at least 3 characters." });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters." });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Enter a valid email address." });
  }

  try {
    const users = readFile(USERS_FILE);
    if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
      return res.status(409).json({ error: `Username "${username}" is already taken.` });
    }
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return res.status(409).json({ error: `Email "${email}" is already registered.` });
    }

    const hashed  = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = {
      id: generateId(), name, lastName, email, username,
      password: hashed,
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    writeFile(USERS_FILE, users);

    const { password: _, ...safe } = newUser;
    res.status(201).json({ message: `User "${username}" registered successfully!`, user: safe });
  } catch (err) {
    res.status(500).json({ error: "Server error during registration." });
  }
});

// POST /login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required." });
  }
  try {
    const users = readFile(USERS_FILE);
    const user  = users.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (!user) {
      return res.status(401).json({ error: `User "${username}" is not registered.` });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Incorrect password. Please try again." });
    }
    const { password: _, ...safe } = user;
    res.json({ message: `Welcome back, ${user.name}! You are logged in.`, user: safe });
  } catch (err) {
    res.status(500).json({ error: "Server error during login." });
  }
});

// GET /users
app.get("/users", (req, res) => {
  try {
    const users = readFile(USERS_FILE);
    const safe  = users.map(({ password, ...u }) => u);
    res.json({ users: safe, count: safe.length });
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve users." });
  }
});

// GET /users/:id
app.get("/users/:id", (req, res) => {
  try {
    const users = readFile(USERS_FILE);
    const user  = users.find(u => u.id === req.params.id);
    if (!user) return res.status(404).json({ error: "User not found." });
    const { password, ...safe } = user;
    res.json(safe);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve user." });
  }
});

// PUT /users/:id
app.put("/users/:id", async (req, res) => {
  const { name, lastName, email, username, password } = req.body;
  if (!name && !lastName && !email && !username && !password) {
    return res.status(400).json({ error: "Provide at least one field to update." });
  }
  try {
    const users = readFile(USERS_FILE);
    const index = users.findIndex(u => u.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "User not found." });

    if (username) {
      const taken = users.some((u, i) => i !== index && u.username.toLowerCase() === username.toLowerCase());
      if (taken) return res.status(409).json({ error: `Username "${username}" is already taken.` });
    }
    if (email) {
      const taken = users.some((u, i) => i !== index && u.email.toLowerCase() === email.toLowerCase());
      if (taken) return res.status(409).json({ error: `Email "${email}" is already in use.` });
    }

    const updated = { ...users[index] };
    if (name)     updated.name     = name;
    if (lastName) updated.lastName = lastName;
    if (email)    updated.email    = email;
    if (username) updated.username = username;
    if (password) updated.password = await bcrypt.hash(password, SALT_ROUNDS);
    updated.updatedAt = new Date().toISOString();

    users[index] = updated;
    writeFile(USERS_FILE, users);

    const { password: _, ...safe } = updated;
    res.json({ message: "User updated successfully.", user: safe });
  } catch (err) {
    res.status(500).json({ error: "Failed to update user." });
  }
});

// ── 404 ───────────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: "Route not found." });
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\nServer running at http://localhost:${PORT}\n`);
  console.log("Pages:");
  console.log("  http://localhost:3000              → Home");
  console.log("  http://localhost:3000/register.html");
  console.log("  http://localhost:3000/login.html\n");
  console.log("Task routes:  GET/POST /tasks  |  GET/PUT/DELETE /tasks/:id");
  console.log("User routes:  POST /register   |  POST /login");
  console.log("              GET /users        |  GET/PUT /users/:id");
});