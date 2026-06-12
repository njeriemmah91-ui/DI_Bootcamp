import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AuthStatus, selectAuthStatus } from '../store/authSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'

function Navbar() {
  const authStatus = useAppSelector(selectAuthStatus)

  return (
    <div className="navbar bg-base-100 border-b border-slate-700/30">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          StoryAuth
        </Link>
      </div>
      <div className="flex-none gap-2">
        <Link to="/login" className="btn btn-sm btn-outline btn-success">
          Login
        </Link>
        <Link to="/signup" className="btn btn-sm btn-success">
          Signup
        </Link>
        <div className="hidden md:block ml-3 text-sm opacity-80">
          {authStatus}
        </div>
      </div>
    </div>
  )
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <div className="container mx-auto px-4">
        <Navbar />
        <div className="py-6">{children}</div>
      </div>
    </div>
  )
}

