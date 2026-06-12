import { Routes, Route, Navigate } from 'react-router-dom'

import { useAppSelector } from './store/hooks'
import { selectAuthStatus } from './store/authSlice'

import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import ProfilerWrapper from './components/ProfilerWrapper'
import ErrorConsoleHighlighter from './components/ErrorConsoleHighlighter'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import StoryPage from './pages/StoryPage'

export default function App() {
  const authStatus = useAppSelector(selectAuthStatus)

  return (
    <ProfilerWrapper>
      <ErrorConsoleHighlighter />

      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/login" element={<LoginPage />} />

          <Route path="/signup" element={<SignupPage />} />

          <Route
            path="/stories/:id"
            element={
              <ProtectedRoute>
                <StoryPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={
              authStatus === 'authenticated' ? (
                <Navigate to="/" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </Layout>
    </ProfilerWrapper>
  )
}

