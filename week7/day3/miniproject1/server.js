const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const TASKS_FILE = path.join(__dirname, "data", "tasks.json");

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Helpers ───────────────────────────────────────────────────────────────────

function readTasks() {
  try {
    const raw = fs.readFileSync(TASKS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    throw new Error("Failed to read tasks file: " + err.message);
  }
}

function writeTasks(tasks) {
  try {
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2), "utf-8");
  } catch (err) {
    throw new Error("Failed to write tasks file: " + err.message);
  }
}

function generateId() {
  return Date.now() + "-" + Math.random().toString(36).slice(2, 9);
}

function validateCreate(body) {
  const errors = {};

  if (!body.title || typeof body.title !== "string" || body.title.trim() === "") {
    errors.title = "Title is required and must be a non-empty string.";
  } else if (body.title.length > 200) {
    errors.title = "Title must be at most 200 characters.";
  }

  if (body.description !== undefined) {
    if (typeof body.description !== "string") {
      errors.description = "Description must be a string.";
    } else if (body.description.length > 2000) {
      errors.description = "Description must be at most 2000 characters.";
    }
  }

  const validStatuses = ["pending", "in-progress", "completed"];
  if (body.status !== undefined && !validStatuses.includes(body.status)) {
    errors.status = 'Status must be one of: "pending", "in-progress", "completed".';
  }

  return Object.keys(errors).length ? errors : null;
}

function validateUpdate(body) {
  const errors = {};

  if (body.title !== undefined) {
    if (typeof body.title !== "string" || body.title.trim() === "") {
      errors.title = "Title must be a non-empty string.";
    } else if (body.title.length > 200) {
      errors.title = "Title must be at most 200 characters.";
    }
  }

  if (body.description !== undefined) {
    if (typeof body.description !== "string") {
      errors.description = "Description must be a string.";
    } else if (body.description.length > 2000) {
      errors.description = "Description must be at most 2000 characters.";
    }
  }

  const validStatuses = ["pending", "in-progress", "completed"];
  if (body.status !== undefined && !validStatuses.includes(body.status)) {
    errors.status = 'Status must be one of: "pending", "in-progress", "completed".';
  }

  return Object.keys(errors).length ? errors : null;
}

// ── Routes ────────────────────────────────────────────────────────────────────

// GET /tasks — list all tasks
app.get("/tasks", (req, res) => {
  try {
    const tasks = readTasks();
    res.json({ tasks, count: tasks.length });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to retrieve tasks." });
  }
});

// GET /tasks/:id — get one task
app.get("/tasks/:id", (req, res) => {
  try {
    const tasks = readTasks();
    const task = tasks.find((t) => t.id === req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found." });
    }
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to retrieve task." });
  }
});

// POST /tasks — create a task
app.post("/tasks", (req, res) => {
  const errors = validateCreate(req.body);
  if (errors) {
    return res.status(400).json({ error: "Validation failed.", details: errors });
  }

  try {
    const tasks = readTasks();
    const now = new Date().toISOString();
    const newTask = {
      id: generateId(),
      title: req.body.title.trim(),
      description: req.body.description !== undefined ? req.body.description : "",
      status: req.body.status || "pending",
      createdAt: now,
      updatedAt: now,
    };
    tasks.push(newTask);
    writeTasks(tasks);
    res.status(201).json(newTask);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to create task." });
  }
});

// PUT /tasks/:id — update a task
app.put("/tasks/:id", (req, res) => {
  const { title, description, status } = req.body;

  if (title === undefined && description === undefined && status === undefined) {
    return res.status(400).json({
      error: "At least one field must be provided: title, description, or status.",
    });
  }

  const errors = validateUpdate(req.body);
  if (errors) {
    return res.status(400).json({ error: "Validation failed.", details: errors });
  }

  try {
    const tasks = readTasks();
    const index = tasks.findIndex((t) => t.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: "Task not found." });
    }

    const updated = {
      ...tasks[index],
      ...(title !== undefined && { title: title.trim() }),
      ...(description !== undefined && { description }),
      ...(status !== undefined && { status }),
      updatedAt: new Date().toISOString(),
    };

    tasks[index] = updated;
    writeTasks(tasks);
    res.json(updated);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to update task." });
  }
});

// DELETE /tasks/:id — delete a task
app.delete("/tasks/:id", (req, res) => {
  try {
    const tasks = readTasks();
    const index = tasks.findIndex((t) => t.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: "Task not found." });
    }
    const [removed] = tasks.splice(index, 1);
    writeTasks(tasks);
    res.json({ message: "Task deleted successfully.", task: removed });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to delete task." });
  }
});

// ── 404 catch-all ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: "Route not found." });
});

// ── Start server ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Task API running at http://localhost:${PORT}`);
  console.log("");
  console.log("Available routes:");
  console.log("  GET    /tasks");
  console.log("  GET    /tasks/:id");
  console.log("  POST   /tasks");
  console.log("  PUT    /tasks/:id");
  console.log("  DELETE /tasks/:id");
});