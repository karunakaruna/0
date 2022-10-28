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
    audioRef.current.play() 
    dispatch('setDoor', name, !door.open, world.getServerTime())
    const Aname = world.getAvatar().name
    world.chat(`${Aname} has ${door.open ? 'closed' : 'opened'} a door`)

  }

  function close1() {
    audioRef.current.play() 
    dispatch('setDoor', name, door.closeTween, world.getServerTime())
  }

  useSignal('Open', open1)
  useSignal('Close', close1)

  useEffect(() => {
    const body = bodyRef.current
    const tween = door.open ? openTween : closeTween
    let t = world.getServerTime() - door.time
    return world.onUpdate(delta => {
      t += delta
      tween.set(t)
      body.setPositionY(tween.value.rotationY)
    })
  }, [door.time])

  return (
    <rigidbody type="kinematic" position={position}>
      <model
        ref={bodyRef}
        src="door_r.glb"
        collision="trimesh"
        onClick={open1}
        />
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

// DOOR ANIMATION
const openTween = new Tween({ rotationY: 0 }).to(
  { rotationY: 5 },
  4,
  Tween.QUAD_IN_OUT
)

const closeTween = new Tween({ rotationY: 5 }).to(
  { rotationY: 0 },
  4,
  Tween.QUAD_IN_OUT
)

