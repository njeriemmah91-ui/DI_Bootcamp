import React, { useState } from "react";

function App() {
  const quotes = [
    {
      quote: "The best way to predict the future is to create it.",
      author: "Peter Drucker",
    },
    {
      quote: "Success is not final, failure is not fatal.",
      author: "Winston Churchill",
    },
    {
      quote: "Believe you can and you're halfway there.",
      author: "Theodore Roosevelt",
    },
    {
      quote: "Do what you can with all you have.",
      author: "Theodore Roosevelt",
    },
    {
      quote: "Dream big and dare to fail.",
      author: "Norman Vaughan",
    },
  ];

  const colors = [
    "#16a085",
    "#27ae60",
    "#2c3e50",
    "#8e44ad",
    "#f39c12",
    "#d35400",
    "#c0392b",
    "#2980b9",
  ];

  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [color, setColor] = useState(colors[0]);

  const generateQuote = () => {
    let randomIndex;

    do {
      randomIndex = Math.floor(Math.random() * quotes.length);
    } while (quotes[randomIndex].quote === currentQuote.quote);

    const randomColor =
      colors[Math.floor(Math.random() * colors.length)];

    setCurrentQuote(quotes[randomIndex]);
    setColor(randomColor);
  };

  return (
    <div
      style={{
        backgroundColor: color,
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "0.5s",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "10px",
          width: "400px",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: color }}>
          "{currentQuote.quote}"
        </h1>

        <p style={{ marginTop: "20px", fontStyle: "italic" }}>
          - {currentQuote.author}
        </p>

        <button
          onClick={generateQuote}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: color,
            color: "white",
            cursor: "pointer",
          }}
        >
          New Quote
        </button>
      </div>
    </div>
  );
}

export default App;