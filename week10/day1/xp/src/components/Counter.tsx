import { useMemo, useState } from 'react';

type LastAction = 'increment' | 'decrement' | null;

export default function Counter() {
  const [count, setCount] = useState<number>(0);
  const [lastAction, setLastAction] = useState<LastAction>(null);

  const lastActionLabel = useMemo(() => {
    if (!lastAction) return 'No actions yet';
    if (lastAction === 'increment') return 'Last action: +1';
    return 'Last action: -1';
  }, [lastAction]);

  function increment() {
    setCount((c) => c + 1);
    setLastAction('increment');
  }

  function decrement() {
    setCount((c) => c - 1);
    setLastAction('decrement');
  }

  return (
    <div>
      <p>
        <strong>Count:</strong> {count}
      </p>
      <p className="muted">{lastActionLabel}</p>

      <div className="btn-row">
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
      </div>
    </div>
  );
}

