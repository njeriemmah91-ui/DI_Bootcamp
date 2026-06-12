import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'
import { selectAuthStatus } from '../store/authSlice'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const status = useAppSelector(selectAuthStatus)

  if (status === 'authenticated') return <>{children}</>
  return <Navigate to="/login" replace />
}

