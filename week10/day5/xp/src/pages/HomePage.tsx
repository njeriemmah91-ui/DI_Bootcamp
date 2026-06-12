import React from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Stories</h1>
      <p className="opacity-80 mt-2 mb-6">
        Demo UI. Protected routes require auth; refresh uses the refresh-token HTTP-only cookie.
      </p>

      <div className="grid md:grid-cols-3 gap-3">
        {[1, 2, 3].map((n) => (
          <div key={n} className="card bg-base-100 border border-slate-700/20">
            <div className="card-body">
              <h2 className="card-title">Story #{n}</h2>
              <p className="opacity-80 text-sm">Click to view (protected)</p>
              <div className="card-actions">
                <Link className="btn btn-sm btn-outline btn-success" to={`/stories/${n}`}>
                  Open
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 opacity-80 text-sm">
        Replace these cards with real API CRUD when the stories backend is added.
      </div>
    </div>
  )
}

