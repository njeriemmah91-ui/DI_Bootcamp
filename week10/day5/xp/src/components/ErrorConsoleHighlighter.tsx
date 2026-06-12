import React, { useEffect } from 'react'

// Requirement: "React Profiler ... colors to be yellow and red"
// This component intercepts console.warn/error and prints with colored prefixes.
export default function ErrorConsoleHighlighter() {
  useEffect(() => {
    const origWarn = console.warn
    const origError = console.error

    console.warn = (...args: any[]) => {
      origWarn('%c[WARNING]', 'color: #fbbf24; font-weight: 700', ...args)
    }

    console.error = (...args: any[]) => {
      origError('%c[ERROR]', 'color: #f87171; font-weight: 700', ...args)
    }

    return () => {
      console.warn = origWarn
      console.error = origError
    }
  }, [])

  return null
}

