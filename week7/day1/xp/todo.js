const express = require("express");
const router = express.Router();

let todos = [];
let id = 1;

// GET all todos
router.get("/", (req, res) => {
  res.json(todos);
});

// CREATE todo
router.post("/", (req, res) => {
  const todo = { id: id++, task: req.body.task };
  todos.push(todo);
  res.json(todo);
});

// UPDATE todo
router.put("/:id", (req, res) => {
  const todo = todos.find(t => t.id == req.params.id);
  if (!todo) return res.status(404).send("Not found");

  todo.task = req.body.task;
  res.json(todo);
});

// DELETE todo
router.delete("/:id", (req, res) => {
  todos = todos.filter(t => t.id != req.params.id);
  res.send("Deleted");
});

module.exports = router;