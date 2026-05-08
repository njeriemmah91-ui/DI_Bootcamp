import { useState } from "react";

function App() {
  const [languages, setLanguages] = useState([
    { name: "Php", votes: 0 },
    { name: "Python", votes: 0 },
    { name: "JavaScript", votes: 0 },
    { name: "Java", votes: 0 },
  ]);

  const handleVote = (index) => {
    const updated = [...languages];
    updated[index] = {
      ...updated[index],
      votes: updated[index].votes + 1,
    };
    setLanguages(updated);
  };

  return (
    <div>
      <h1>Voting App</h1>
      {languages.map((lang, index) => (
        <div key={lang.name}>
          <p>
            {lang.name}: {lang.votes}
          </p>
          <button onClick={() => handleVote(index)}>
            Vote {lang.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;