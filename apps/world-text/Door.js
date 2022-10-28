import React, { useRef, useEffect } from 'react'
import { DEG2RAD, useWorld, useSyncState, useSignal } from 'hyperfy'

import { Tween } from './Tween'

export function Door({ name, position, startOpen = false }) {
  const bodyRef = useRef()
  const audioRef = useRef()
  const world = useWorld()
  
  const [door, dispatch] = useSyncState(state => {
    const door = state.doors[name]
    if (door) {
      return door
    } else {
      return {
        open: startOpen,
        time: -999,
      }
    }
  })

  function open1() {

    // Does Not Work
    // audioRef.current.play() 
    dispatch('setDoor', name, !door.open, world.getServerTime())
    const Aname = world.getAvatar().name
    world.chat(`${Aname} found a secret.`)
    // open2()

  }

  useSignal('Open', open1)



  return (
    <rigidbody type="kinematic" position={position}>

      <audio 
          ref={audioRef}
          src="chime1.wav" 
          volume="5"
          position={[0, 0, 0]} 
          autoplay={false} 
          spatial={true} 
          loop={false} />
    </rigidbody>
    
  )
}

export function getInitialDoorState() {
  return {
    doors: {
      /*
      [name]: {
        open: Boolean
        time: Number
      }
      */
    },
  }
}


export function getDoorActions() {
  return {
    setDoor(state, name, open, time) {
      if (state.doors[name]) {
        if (state.doors[name].open !== open) {
          state.doors[name].open = open
          state.doors[name].time = time
        }
      } else {
        state.doors[name] = {
          open,
          time,
        }
      }
    },
  }
}


