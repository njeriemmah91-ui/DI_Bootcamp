import React, { Profiler } from 'react'

export default function ProfilerWrapper({ children }: { children: React.ReactNode }) {
  const onRender: React.ProfilerOnRenderCallback = (id, phase, actualDuration) => {
    const color =
      actualDuration > 50
        ? 'color: #f87171; font-weight:700'
        : 'color:#fbbf24; font-weight:700'

    console.log(`%c[RENDER ${phase.toUpperCase()}] ${id}`, color)
    console.log({ actualDurationMs: actualDuration })
  }

  return (
    <Profiler id="AppTree" onRender={onRender}>
      {children}
    </Profiler>
  )
}


