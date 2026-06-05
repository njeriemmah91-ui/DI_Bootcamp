import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [
    { id: 1, name: 'Work', color: '#2196f3' },
    { id: 2, name: 'Health', color: '#4caf50' },
    { id: 3, name: 'Personal', color: '#ff9800' },
  ],
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action) => {
      const newCategory = {
        id: Math.max(...state.categories.map((c) => c.id), 0) + 1,
        ...action.payload,
      };
      state.categories.push(newCategory);
    },
    editCategory: (state, action) => {
      const category = state.categories.find((c) => c.id === action.payload.id);
      if (category) {
        Object.assign(category, action.payload);
      }
    },
    deleteCategory: (state, action) => {
      state.categories = state.categories.filter((c) => c.id !== action.payload);
    },
  },
});

export const { addCategory, editCategory, deleteCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;
