import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { api } from '../utils/api'

export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated' | 'error'

export type AuthState = {
  status: AuthStatus
  accessToken: string | null
  user: { id: number; email: string; username: string } | null
  error: string | null
}

const initialState: AuthState = {
  status: 'idle',
  accessToken: null,
  user: null,
  error: null,
}

export const signupThunk = createAsyncThunk(
  'auth/signup',
  async (payload: { email: string; password: string; username?: string }) => {
    const res = await api.post('/api/auth/register', payload)
    return res.data as { accessToken: string; user: AuthState['user'] }
  },
)

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (payload: { email: string; password: string }) => {
    const res = await api.post('/api/auth/login', payload)
    return res.data as { accessToken: string; user: AuthState['user'] }
  },
)

export const refreshAccessTokenThunk = createAsyncThunk('auth/refresh', async () => {
  const res = await api.post('/api/auth/refresh', {})
  return res.data as { accessToken: string }
})

export const logoutAction = () => ({
  type: 'auth/logout',
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<string | null>) {
      state.accessToken = action.payload
    },
    setUser(state, action: PayloadAction<AuthState['user']>) {
      state.user = action.payload
    },
    setAuthStatus(state, action: PayloadAction<AuthStatus>) {
      state.status = action.payload
    },
    authError(state, action: PayloadAction<string>) {
      state.error = action.payload
      state.status = 'error'
    },
    logout(state) {
      state.status = 'unauthenticated'
      state.accessToken = null
      state.user = null
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(signupThunk.fulfilled, (state, action) => {
        state.status = 'authenticated'
        state.accessToken = action.payload.accessToken
        state.user = action.payload.user
      })
      .addCase(signupThunk.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.error.message ?? 'Signup failed'
      })

      .addCase(loginThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.status = 'authenticated'
        state.accessToken = action.payload.accessToken
        state.user = action.payload.user
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.error.message ?? 'Login failed'
      })

      .addCase(refreshAccessTokenThunk.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken
        state.status = 'authenticated'
      })
      .addCase(refreshAccessTokenThunk.rejected, (state) => {
        state.accessToken = null
        state.user = null
        state.status = 'unauthenticated'
      })

    builder.addCase('auth/logout' as any, (state) => {
      state.status = 'unauthenticated'
      state.accessToken = null
      state.user = null
      state.error = null
    })
  },
})

export const { setAccessToken, setUser, setAuthStatus, authError, logout } = authSlice.actions
export const selectAuthStatus = (state: { auth: AuthState }) => state.auth.status
export const selectAccessToken = (state: { auth: AuthState }) => state.auth.accessToken
export const selectUser = (state: { auth: AuthState }) => state.auth.user

export default authSlice.reducer

