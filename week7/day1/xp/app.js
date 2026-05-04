const express = require("express");
const app = express();

app.use(express.json());

// Routes
const indexRouter = require("./routes/index");
const todosRouter = require("./routes/todos");
const booksRouter = require("./routes/books");

// Mount routes
app.use("/", indexRouter);
app.use("/todos", todosRouter);
app.use("/books", booksRouter);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});