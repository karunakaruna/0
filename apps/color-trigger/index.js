import React, { useRef, useState } from 'react'
import { useSyncState } from 'hyperfy'

/**
 * This recipe shows how to make a video play when you get near it (and stop when you walk away) using a trigger box
        <video
          height={2}
          ref={videoRef}
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          autoplay={false}
        />

*/

export default function App() {
  const videoRef = useRef()
  const [color, dispatch] = useSyncState(state => state.color)

  return (
    <app>
      <group position={[0, 1.5, -10]}>
        <box size={[3, 0.1, 3]} color={color}/>
        <trigger
          size={2}
          onEnter={() => dispatch('toggle')}
          onLeave={() => dispatch('toggle')}
        />
      </group>
    </app>
  )
}
const initialState = {
  color: 'blue',
}

export function getStore(state = initialState) {
  return {
    state,
    actions: {
      toggle(state) {
        state.color = state.color === 'blue' ? 'red' : 'blue'
      },
    },
  }
}