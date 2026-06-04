import React from 'react';
import { useSelector } from 'react-redux';

export default function AgeDisplay() {
  const { age, loading, error } = useSelector((state) => state.age);

  return (
    <div className="age-row">
      <div>
        <div className="age-title">Current Age</div>
        <div className="age-value">
          {age}
          {loading ? <span style={{ fontSize: 16, marginLeft: 10, color: '#a8b3d6' }}>(updating...)</span> : null}
        </div>
      </div>

      <div aria-live="polite" aria-busy={loading}>
        {loading ? <div className="spinner" /> : null}
      </div>

      {error ? (
        <div style={{ gridColumn: '1 / -1', marginTop: 8, color: 'var(--danger)', fontSize: 13, width: '100%' }}>
          {error}
        </div>
      ) : null}
    </div>
  );
}

