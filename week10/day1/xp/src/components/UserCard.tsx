type UserCardProps = {
  name?: string;
  age?: number;
  role?: string;
};


const DEFAULTS = {
  name: 'Unknown',
  age: 0,
  role: 'User'
} as const;

export default function UserCard({ name, age, role }: UserCardProps) {
  const resolvedName = name ?? DEFAULTS.name;
  const resolvedAge = age ?? DEFAULTS.age;
  const resolvedRole = role ?? DEFAULTS.role;

  return (
    <div>
      <h3>{resolvedName}</h3>
      <p className="muted">Role: {resolvedRole}</p>
      <p>
        Age: <strong>{resolvedAge}</strong>
      </p>
    </div>
  );
}

