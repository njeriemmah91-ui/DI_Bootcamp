import React from 'react';
import AgeDisplay from './components/AgeDisplay.jsx';
import AgeControls from './components/AgeControls.jsx';

export default function App() {
  return (
    <div className="dc-app">
      <header className="dc-header">
        <h1>Age Tracker</h1>
        <p>Redux Toolkit + Thunk async actions with a loading indicator.</p>
      </header>

      <section className="dc-card">
        <AgeDisplay />
        <AgeControls />
      </section>

      <footer className="dc-footer">
        Tip: Click <b>Age Up</b> / <b>Age Down</b> repeatedly to see loading state.
      </footer>
    </div>
  );
}

