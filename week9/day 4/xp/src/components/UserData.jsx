import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, fetchUserById } from '../redux/usersSlice.js';

export default function UserData() {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.users);

  const [id, setId] = useState('1');

  const canFetch = useMemo(() => {
    const n = Number(id);
    return Number.isInteger(n) && n > 0;
  }, [id]);

  const onFetch = () => {
    if (!canFetch) return;
    dispatch(fetchUserById(id));
  };

  const onClear = () => {
    dispatch(clearUser());
  };

  return (
    <div className="card">
      <div className="row">
        <div>
          <label htmlFor="userId">User ID</label>
          <div style={{ height: 6 }} />
          <input
            id="userId"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="e.g. 1"
            inputMode="numeric"
          />
        </div>

        <div style={{ alignSelf: 'flex-end', display: 'flex', gap: 10 }}>
          <button disabled={!canFetch || status === 'loading'} onClick={onFetch}>
            {status === 'loading' ? 'Fetching...' : 'Fetch User'}
          </button>
          <button onClick={onClear} disabled={status === 'loading'}>
            Clear
          </button>
        </div>
      </div>

      {status === 'idle' && <div className="status">Enter a User ID and click <b>Fetch User</b>.</div>}
      {status === 'loading' && <div className="status">Loading user data...</div>}
      {status === 'succeeded' && (
        <div className="status ok">User fetched successfully.</div>
      )}
      {status === 'failed' && (
        <div className="status err">
          Error: <b>{String(error)}</b>
          <div style={{ marginTop: 6, color: 'rgba(255,210,210,0.9)', fontSize: 13 }}>
            Tip: try an invalid ID like <code>9999</code> to test error handling.
          </div>
        </div>
      )}

      {status === 'succeeded' && data && data.id && (
        <div className="userGrid">
          <div className="kv">
            <div className="k">Name</div>
            <div className="v">{data.name}</div>
          </div>
          <div className="kv">
            <div className="k">Username</div>
            <div className="v">{data.username}</div>
          </div>
          <div className="kv">
            <div className="k">Email</div>
            <div className="v">{data.email}</div>
          </div>
          <div className="kv">
            <div className="k">Phone</div>
            <div className="v">{data.phone}</div>
          </div>
          <div className="kv">
            <div className="k">Website</div>
            <div className="v">{data.website}</div>
          </div>
          <div className="kv">
            <div className="k">Company</div>
            <div className="v">{data.company?.name}</div>
          </div>
        </div>
      )}
    </div>
  );
}

