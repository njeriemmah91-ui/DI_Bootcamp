import React from 'react';
import UserData from './components/UserData.jsx';

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Redux Thunk: Fetch User Data</h1>
        <p>Fetch and display a user from an API using Redux Toolkit + async thunk.</p>
      </header>

      <main className="main">
        <UserData />
      </main>

      <footer className="footer">
        API: <code>https://jsonplaceholder.typicode.com/users/:id</code>
      </footer>
    </div>
  );
}

