const express = require("express");
const router = express.Router();

//  Quiz questions
const triviaQuestions = [
  {
    question: "What is the capital of France?",
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    answer: "Mars",
  },
  {
    question: "What is the largest mammal in the world?",
    answer: "Blue whale",
  },
];

// 🎮 Game state
let currentIndex = 0;
let score = 0;

// ▶️ GET /quiz → start or show question
router.get("/", (req, res) => {
  if (currentIndex >= triviaQuestions.length) {
    return res.json({
      message: "Quiz finished! Check your score at /quiz/score",
    });
  }

  res.json({
    question: triviaQuestions[currentIndex].question,
  });
});

//  POST /quiz → submit answer
router.post("/", (req, res) => {
  if (currentIndex >= triviaQuestions.length) {
    return res.json({ message: "Quiz already finished" });
  }

  const userAnswer = req.body.answer || "";
  const correctAnswer = triviaQuestions[currentIndex].answer;

  let result;

  if (userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
    score++;
    result = "✅ Correct!";
  } else {
    result = `❌ Wrong! Correct answer: ${correctAnswer}`;
  }

  currentIndex++;

  // next question or finish
  if (currentIndex < triviaQuestions.length) {
    return res.json({
      result,
      nextQuestion: triviaQuestions[currentIndex].question,
    });
  }

  res.json({
    result,
    message: "Quiz completed! Go to /quiz/score",
  });
});

//  GET /quiz/score → final score
router.get("/score", (req, res) => {
  res.json({
    totalQuestions: triviaQuestions.length,
    score,
  });
});

module.exports = router;