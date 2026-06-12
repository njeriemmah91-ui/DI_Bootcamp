import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { loginThunk, selectAuthStatus } from '../store/authSlice'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState<string | null>(null)

  const status = useAppSelector(selectAuthStatus)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErr(null)
    try {
      const res = await dispatch(loginThunk({ email, password })).unwrap()
      if (res?.accessToken) navigate('/')
    } catch (e: any) {
      setErr(e?.message ?? 'Login failed')
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-2">Login</h1>
      <p className="opacity-80 mb-6">Use your email and password</p>

      <form className="card bg-base-100 border border-slate-700/20 p-6" onSubmit={onSubmit}>
        {err && <div className="text-error font-semibold mb-3">{err}</div>}

        <label className="form-control mb-3">
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <input
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
        </label>

        <label className="form-control mb-4">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <input
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
        </label>

        <button className="btn btn-success w-full" disabled={status === 'loading'} type="submit">
          {status === 'loading' ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}

