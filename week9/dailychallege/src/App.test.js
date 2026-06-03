import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Daily Planner heading', () => {
  render(<App />);
  expect(screen.getByText(/Daily Planner/i)).toBeInTheDocument();
});

