import { createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
  },
  reducers: {
    addTodo: (state, action) => {
      const text = action.payload;
      state.todos.push({
        id: Date.now(),
        text,
        completed: false,
      });
    },
    toggleTodo: (state, action) => {
      const id = action.payload;
      const todo = state.todos.find((t) => t.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodo: (state, action) => {
      const id = action.payload;
      state.todos = state.todos.filter((t) => t.id !== id);
    },
  },
});

export const { addTodo, toggleTodo, removeTodo } = todosSlice.actions;
export default todosSlice.reducer;

