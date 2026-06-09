import { configureStore } from '@reduxjs/toolkit';
import { usersSlice, recipesSlice, postsSlice } from '../features/dataSlice';

/**
 * Redux Store Configuration
 */

export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    recipes: recipesSlice.reducer,
    posts: postsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
