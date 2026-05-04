const express = require("express");
const app = express();

app.use(express.json());

// Routes
const quizRouter = require("./routes/quiz");
app.use("/quiz", quizRouter);

// Server start
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Quiz Game running on http://localhost:${PORT}`);
});