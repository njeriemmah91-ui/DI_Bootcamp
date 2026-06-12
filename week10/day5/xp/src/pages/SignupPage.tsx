import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { signupThunk, selectAuthStatus } from '../store/authSlice'

export default function SignupPage() {
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
      await dispatch(signupThunk({ email, password, username: email })).unwrap()
      navigate('/')
    } catch (e: any) {
      setErr(e?.message ?? 'Signup failed')
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-2">Signup</h1>
      <p className="opacity-80 mb-6">Email = username for this demo</p>

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
          {status === 'loading' ? 'Signing up...' : 'Signup'}
        </button>
      </form>
    </div>
  )
}

