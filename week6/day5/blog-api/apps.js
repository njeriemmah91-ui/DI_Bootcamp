const express = require('express');
const app = express();

app.use(express.json());

let books = [
  { id: 1, title: "Book One", author: "Author A", publishedYear: 2001 },
  { id: 2, title: "Book Two", author: "Author B", publishedYear: 2005 }
];

// GET all books
app.get('/api/books', (req, res) => {
  res.json(books);
});

// GET book by id
app.get('/api/books/:bookId', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.bookId));
  if (!book) return res.status(404).send("Book not found");
  res.json(book);
});

// CREATE book
app.post('/api/books', (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
    publishedYear: req.body.publishedYear
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

app.listen(5000, () => {
  console.log("Book API running on port 5000");
});