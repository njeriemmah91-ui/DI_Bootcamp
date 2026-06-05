import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [
    { id: 1, title: 'Complete Redux tutorial', category: 1, completed: false, progress: 50 },
    { id: 2, title: 'Build a React app', category: 1, completed: false, progress: 30 },
    { id: 3, title: 'Learn selectors', category: 1, completed: true, progress: 100 },
    { id: 4, title: 'Morning jog', category: 2, completed: true, progress: 100 },
    { id: 5, title: 'Read a book chapter', category: 3, completed: false, progress: 60 },
    { id: 6, title: 'Fix bugs in project', category: 1, completed: false, progress: 40 },
    { id: 7, title: 'Meditate', category: 2, completed: false, progress: 0 },
    { id: 8, title: 'Grocery shopping', category: 3, completed: false, progress: 20 },
  ],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Math.max(...state.tasks.map((t) => t.id), 0) + 1,
        ...action.payload,
        completed: false,
        progress: 0,
      };
      state.tasks.push(newTask);
    },
    editTask: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        Object.assign(task, action.payload);
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
    toggleTaskCompletion: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        task.progress = task.completed ? 100 : task.progress;
      }
    },
    updateTaskProgress: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.progress = action.payload.progress;
      }
    },
  },
});

export const { addTask, editTask, deleteTask, toggleTaskCompletion, updateTaskProgress } =
  tasksSlice.actions;

export default tasksSlice.reducer;
