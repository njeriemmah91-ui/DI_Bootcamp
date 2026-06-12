import React from 'react'
import { useParams } from 'react-router-dom'

export default function StoryPage() {
  const { id } = useParams()

  return (
    <div>
      <h1 className="text-2xl font-bold">Story {id}</h1>
      <p className="opacity-80 mt-2">Protected page scaffold.</p>
    </div>
  )
}

