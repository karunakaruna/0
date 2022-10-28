import React, { useRef, useEffect } from 'react'
import { useSignal, useWorld, DEG2RAD, useSyncState } from 'hyperfy'

import { Tween } from './tween'

export default function App({ name, position, startOpen = false }) {
  const bodyRef = useRef()
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


// Lower and Raise the Island
  function open1() {
    dispatch('setDoor', name, !door.open, world.getServerTime())
  }

  useSignal('Open', open1)

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
    <app>
      <hdr color="red" />
      <rigidbody>
        <model src="0b.glb" collision="trimesh"/>
      </rigidbody>
      <rigidbody>
        <model 
          ref={bodyRef} 
          src="0b_far.glb" collision="trimesh" position={position} type="kinematic"/>
      </rigidbody>
      <audio 
          src="bird.mp3" 
          volume="4"
          position={[0, 0, -5]} 
          autoplay="true" 
          spatial="false" 
          loop="true"/>
      <audio 
          src="healing.mp3" 
          volume=".5"
          position={[0, 0, -5]} 
          autoplay="true" 
          spatial="false" 
          loop="true"/>
      <audio 
          src="chord.wav" 
          volume="2"
          position={[0, 0, -5]} 
          autoplay="true" 
          spatial="false" 
          loop="true"/>
    </app>
  )
}


// Get Island Initial State
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

// Island State
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

// Island ANIMATION
const openTween = new Tween({ rotationY: 0 }).to(
  { rotationY: 135 * DEG2RAD },
  4,
  Tween.QUAD_IN_OUT
)
const closeTween = new Tween({ rotationY: 135 * DEG2RAD }).to(
  { rotationY: 0 },
  4,
  Tween.QUAD_IN_OUT
)
