import { useState, useEffect, useRef } from "react";

function Garage({ size }) {
  return <p>Who lives in my {size} Garage?</p>;
}

const carinfo = { name: "Ford", model: "Mustang" };

function Car() {
  const [color, setColor] = useState("red");

  return (
    <div>
      <h2>This car is {color} {carinfo.model}</h2>
      <Garage size="small" />
      <div>
        {["red", "blue", "green", "black", "white"].map((c) => (
          <button key={c} onClick={() => setColor(c)}>
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}

function Events() {
  const [isToggleOn, setIsToggleOn] = useState(true);
  const inputRef = useRef(null);

  const clickMe = () => alert("I was clicked");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") alert(inputRef.current.value);
  };

  return (
    <div>
      <button onClick={clickMe}>Click Me</button>
      <input ref={inputRef} onKeyDown={handleKeyDown} type="text" />
      <button onClick={() => setIsToggleOn((prev) => !prev)}>
        {isToggleOn ? "ON" : "OFF"}
      </button>
    </div>
  );
}

function Phone() {
  const [brand] = useState("Samsung");
  const [model] = useState("Galaxy S20");
  const [color, setColor] = useState("black");
  const [year] = useState(2020);

  return (
    <div>
      <p>Brand: {brand}</p>
      <p>Model: {model}</p>
      <p>Color: {color}</p>
      <p>Year: {year}</p>
      <button onClick={() => setColor("blue")}>Change Color</button>
    </div>
  );
}

function Color() {
  const [favoriteColor, setFavoriteColor] = useState("red");

  useEffect(() => {
    alert("useEffect reached");
  }, [favoriteColor]);

  return (
    <div>
      <h2 style={{ color: favoriteColor }}>My favorite color is {favoriteColor}</h2>
      <button onClick={() => setFavoriteColor("blue")}>Blue</button>
      <button onClick={() => setFavoriteColor("red")}>Red</button>
      <button onClick={() => setFavoriteColor("yellow")}>Yellow</button>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("car");

  return (
    <div>
      <nav>
        <button onClick={() => setPage("car")}>Car</button>
        <button onClick={() => setPage("events")}>Events</button>
        <button onClick={() => setPage("phone")}>Phone</button>
        <button onClick={() => setPage("color")}>Color</button>
      </nav>

      {page === "car" && <Car />}
      {page === "events" && <Events />}
      {page === "phone" && <Phone />}
      {page === "color" && <Color />}
    </div>
  );
}