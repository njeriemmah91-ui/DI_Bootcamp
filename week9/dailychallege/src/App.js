import { useMemo, useState } from "react";
import DatePicker from "./components/DatePicker";
import TaskBoard from "./components/TaskBoard";
import "./styles.css";

function App() {
  const todayISO = useMemo(() => {
    const d = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }, []);

  const [selectedDay, setSelectedDay] = useState(todayISO);

  return (
    <div className="container">
      <h1>Daily Planner</h1>

      <DatePicker selectedDay={selectedDay} onChange={setSelectedDay} />

      <TaskBoard selectedDay={selectedDay} />
    </div>
  );
}

export default App;

