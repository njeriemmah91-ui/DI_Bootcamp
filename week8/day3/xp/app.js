import React, { createContext, useContext, useState, useRef } from 'react';

// ─── Theme Context ───────────────────────────────────────────────────────────

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  return useContext(ThemeContext);
}

// ─── Exercise 1: Theme Switcher ───────────────────────────────────────────────

function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  const pageStyle = {
    backgroundColor: theme === 'light' ? '#ffffff' : '#1a1a1a',
    color: theme === 'light' ? '#111111' : '#f0f0f0',
    transition: 'all 0.3s ease',
    padding: '40px',
    borderRadius: '10px',
    textAlign: 'center',
  };

  const buttonStyle = {
    padding: '10px 20px',
    cursor: 'pointer',
    backgroundColor: theme === 'light' ? '#333' : '#eee',
    color: theme === 'light' ? '#fff' : '#333',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    marginTop: '12px',
  };

  return (
    <div style={pageStyle}>
      <h2>Exercise 1: Theme Switcher</h2>
      <p>Current theme: <strong>{theme}</strong></p>
      <p>This content updates based on the selected theme.</p>
      <button style={buttonStyle} onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </div>
  );
}

// ─── Exercise 2: Character Counter ───────────────────────────────────────────

function CharacterCounter() {
  const inputRef = useRef(null);
  const [count, setCount] = useState(0);

  const handleInput = () => {
    setCount(inputRef.current.value.length);
  };

  return (
    <div style={{ padding: '40px' }}>
      <h2>Exercise 2: Character Counter</h2>
      <textarea
        ref={inputRef}
        onInput={handleInput}
        rows={5}
        style={{
          width: '100%',
          padding: '10px',
          fontSize: '16px',
          borderRadius: '6px',
          border: '1px solid #ccc',
          resize: 'vertical',
          boxSizing: 'border-box',
        }}
        placeholder="Start typing..."
      />
      <p style={{ marginTop: '10px', color: '#555' }}>
        Character count: <strong>{count}</strong>
      </p>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

function App() {
  return (
    <ThemeProvider>
      <div style={{ fontFamily: 'sans-serif', maxWidth: '600px', margin: '40px auto' }}>
        <h1 style={{ textAlign: 'center' }}>React Hooks Exercises</h1>
        <hr />
        <ThemeSwitcher />
        <hr style={{ margin: '30px 0' }} />
        <CharacterCounter />
      </div>
    </ThemeProvider>
  );
}

export default App;