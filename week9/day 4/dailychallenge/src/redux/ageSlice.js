import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const ageUpAsync = createAsyncThunk(
  'age/up',
  async (_, { rejectWithValue }) => {
    try {
      // simulate delay
      await sleep(900);
      return { delta: 1 };
    } catch (err) {
      return rejectWithValue({ message: err?.message || 'Failed to age up' });
    }
  }
);

export const ageDownAsync = createAsyncThunk(
  'age/down',
  async (_, { rejectWithValue }) => {
    try {
      // simulate delay
      await sleep(900);
      return { delta: -1 };
    } catch (err) {
      return rejectWithValue({ message: err?.message || 'Failed to age down' });
    }
  }
);

const ageSlice = createSlice({
  name: 'age',
  initialState: {
    age: 18,
    loading: false,
    error: null,
  },
  reducers: {
    resetAge: (state, action) => {
      state.age = action?.payload ?? 18;
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(ageUpAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ageUpAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.age += action.payload.delta;
      })
      .addCase(ageUpAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.error.message;
      })

      .addCase(ageDownAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ageDownAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.age = Math.max(0, state.age + action.payload.delta);
      })
      .addCase(ageDownAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.error.message;
      });
  },
});

export const { resetAge } = ageSlice.actions;
export default ageSlice.reducer;

