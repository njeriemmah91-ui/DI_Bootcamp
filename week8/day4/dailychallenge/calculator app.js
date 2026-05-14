import React, { useState } from "react";

function App() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [operation, setOperation] = useState("+");
  const [result, setResult] = useState("");

  const calculate = () => {
    const number1 = Number(num1);
    const number2 = Number(num2);

    let answer;

    switch (operation) {
      case "+":
        answer = number1 + number2;
        break;

      case "-":
        answer = number1 - number2;
        break;

      case "*":
        answer = number1 * number2;
        break;

      case "/":
        answer =
          number2 !== 0
            ? number1 / number2
            : "Cannot divide by zero";
        break;

      default:
        answer = 0;
    }

    setResult(answer);
  };

  return (
    <div style={styles.container}>
      <div style={styles.calculator}>
        <h1>React Calculator</h1>

        <input
          type="number"
          placeholder="First Number"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          style={styles.input}
        />

        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
          style={styles.select}
        >
          <option value="+">Addition (+)</option>
          <option value="-">Subtraction (-)</option>
          <option value="*">Multiplication (*)</option>
          <option value="/">Division (/)</option>
        </select>

        <input
          type="number"
          placeholder="Second Number"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
          style={styles.input}
        />

        <button onClick={calculate} style={styles.button}>
          Calculate
        </button>

        <h2>Result: {result}</h2>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f4f4",
  },

  calculator: {
    background: "white",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
    textAlign: "center",
    width: "300px",
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid gray",
    fontSize: "16px",
  },

  select: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    fontSize: "16px",
  },

  button: {
    width: "100%",
    padding: "10px",
    border: "none",
    background: "#111",
    color: "white",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default App;