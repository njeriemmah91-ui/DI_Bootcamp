import axios from 'axios'
import { store } from '../store/store'
import { setAccessToken } from '../store/authSlice'

const BASE_URL = ''

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken
  if (token) {
    config.headers = config.headers ?? {}
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

// Refresh & replay on 401
let isRefreshing = false
let queue: Array<(token: string) => void> = []

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config
    if (!originalRequest) throw err

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        if (!isRefreshing) {
          isRefreshing = true
          const refreshResponse = await api.post('/api/auth/refresh', {})
          const newAccessToken = refreshResponse.data?.accessToken
          if (newAccessToken) {
            store.dispatch(setAccessToken(newAccessToken))
            queue.forEach((cb) => cb(newAccessToken))
            queue = []
          }
          isRefreshing = false
        }

        const newToken = store.getState().auth.accessToken
        if (newToken) {
          originalRequest.headers = originalRequest.headers ?? {}
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`
        }
        return api(originalRequest)
      } catch {
        store.dispatch({ type: 'auth/logout' })
        throw err
      }
    }

    throw err
  },
)

