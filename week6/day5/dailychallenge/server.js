const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.static('views'));

let score = 0;

// 🎯 Emoji list
const emojis = [
  { emoji: '😀', name: 'Smile' },
  { emoji: '🐶', name: 'Dog' },
  { emoji: '🌮', name: 'Taco' },
  { emoji: '🚗', name: 'Car' },
  { emoji: '🍕', name: 'Pizza' },
  { emoji: '⚽', name: 'Football' }
];

// 🏠 FIX: Home route (THIS FIXES "Cannot GET /")
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// 🎲 Get random emoji
app.get('/game', (req, res) => {
  const correct = emojis[Math.floor(Math.random() * emojis.length)];

  let options = [correct.name];

  while (options.length < 4) {
    const random = emojis[Math.floor(Math.random() * emojis.length)].name;
    if (!options.includes(random)) {
      options.push(random);
    }
  }

  options = options.sort(() => Math.random() - 0.5);

  res.json({
    emoji: correct.emoji,
    answer: correct.name,
    options,
    score
  });
});

// 📩 Check answer
app.post('/guess', (req, res) => {
  const { guess, answer } = req.body;

  if (guess === answer) {
    score++;
    res.json({ result: "Correct 🎉", score });
  } else {
    res.json({ result: "Wrong ❌", score });
  }
});

// 🚀 Start server
app.listen(3000, () => {
  console.log("Emoji Game running on http://localhost:3000");
});