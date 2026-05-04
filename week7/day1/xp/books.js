const express = require("express");
const router = express.Router();

let books = [];
let id = 1;

// GET all books
router.get("/", (req, res) => {
  res.json(books);
});

// CREATE book
router.post("/", (req, res) => {
  const book = {
    id: id++,
    title: req.body.title,
    author: req.body.author
  };
  books.push(book);
  res.json(book);
});

// UPDATE book
router.put("/:id", (req, res) => {
  const book = books.find(b => b.id == req.params.id);
  if (!book) return res.status(404).send("Not found");

  book.title = req.body.title;
  book.author = req.body.author;

  res.json(book);
});

// DELETE book
router.delete("/:id", (req, res) => {
  books = books.filter(b => b.id != req.params.id);
  res.send("Deleted");
});

module.exports = router;