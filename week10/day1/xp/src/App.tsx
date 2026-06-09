import { useState } from 'react';
import Greeting from './components/Greeting';
import Counter from './components/Counter';
import UserCard from './components/UserCard';
import UserList from './components/UserList';

export default function App() {
  const [selectedUser, setSelectedUser] = useState<'all' | 'partial'>('all');

  return (
    <div className="container">
      <h1>Week 10 - Day 1 XP (React + TypeScript)</h1>
      <p className="muted">All exercises implemented with typed props/state/hooks.</p>

      <section className="card">
        <h2>Exercise 2: Greeting component</h2>
        <Greeting name="Student" messageCount={3} />
      </section>

      <section className="card">
        <h2>Exercise 3: Counter component</h2>
        <Counter />
      </section>

      <section className="card">
        <h2>Exercise 4: Optional props (UserCard)</h2>
        <div className="btn-row">
          <button onClick={() => setSelectedUser('all')}>Show all props</button>
          <button onClick={() => setSelectedUser('partial')}>Omit some props</button>
        </div>

        {selectedUser === 'all' ? (
          <UserCard name="Ava" age={22} role="Developer" />
        ) : (
          <UserCard name="Sam" />
        )}
      </section>

      <section className="card">
        <h2>Exercise 5: Fetch users (UserList)</h2>
        <UserList />
      </section>
    </div>
  );
}

