import { useEffect, useState } from 'react';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
};

type ApiError = {
  message: string;
};

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchUsers() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const data: unknown = await response.json();

        if (!Array.isArray(data)) {
          throw new Error('Unexpected API response');
        }

        const mappedUsers: User[] = data.map((u: any) => ({
          id: Number(u.id),
          name: String(u.name),
          username: String(u.username),
          email: String(u.email),
          phone: String(u.phone),
          website: String(u.website)
        }));

        if (!cancelled) {
          setUsers(mappedUsers);
        }
      } catch (e) {
        if (cancelled) return;

        const message = e instanceof Error ? e.message : 'Unknown error';
        setError({ message });
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchUsers();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div>
        <p>Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <p>Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="muted">Fetched from: jsonplaceholder</div>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="books-container" style={{ display: 'grid', gap: 12 }}>
          {users.map((user) => (
            <div key={user.id} className="book-card">
              <h3 style={{ marginTop: 0 }}>{user.name}</h3>
              <p>
                <span className="label">@</span>
                {user.username}
              </p>
              <p>
                <span className="label">Email:</span> {user.email}
              </p>
              <p>
                <span className="label">Phone:</span> {user.phone}
              </p>
              <p>
                <span className="label">Website:</span> {user.website}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

