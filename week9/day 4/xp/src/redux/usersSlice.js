import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const API_BASE = 'https://jsonplaceholder.typicode.com/users';

export const fetchUserById = createAsyncThunk(
  'users/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE}/${id}`);

      if (!response.ok) {
        // jsonplaceholder returns 404 for non-existing ids
        return rejectWithValue({
          message: `Request failed with status ${response.status}`,
          status: response.status
        });
      }

      const data = await response.json();
      return data;
    } catch (err) {
      return rejectWithValue({
        message: err?.message || 'Network error',
      });
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    data: {},
    status: 'idle', // idle | loading | succeeded | failed
    error: null
  },
  reducers: {
    clearUser: (state) => {
      state.data = {};
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || action.error.message;
      });
  }
});

export const { clearUser } = usersSlice.actions;
export default usersSlice.reducer;

