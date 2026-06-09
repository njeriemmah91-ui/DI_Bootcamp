import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FetchState } from '../types/types';

/**
 * Generic Data Slice for Redux
 * Manages the state of fetched data
 */

export const createDataSlice = <T,>(dataType: string) => {
  const initialState: FetchState<T> = {
    data: [],
    loading: false,
    error: null,
    query: '',
  };

  return createSlice({
    name: `data_${dataType}`,
    initialState,
    reducers: {
      fetchStart: (state) => {
        state.loading = true;
        state.error = null;
      },
      fetchSuccess: (state, action: PayloadAction<T[]>) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      },
      fetchError: (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
        state.data = [];
      },
      setQuery: (state, action: PayloadAction<string>) => {
        state.query = action.payload;
      },
      resetState: (state) => {
        state.data = [];
        state.loading = false;
        state.error = null;
        state.query = '';
      },
    },
  });
};

// Create slices for different data types
export const usersSlice = createDataSlice<any>('users');
export const recipesSlice = createDataSlice<any>('recipes');
export const postsSlice = createDataSlice<any>('posts');

// Export actions
export const usersActions = usersSlice.actions;
export const recipesActions = recipesSlice.actions;
export const postsActions = postsSlice.actions;
