import React, { useRef, useEffect } from 'react'
import { useSignal, useWorld, DEG2RAD, useSyncState } from 'hyperfy'
import { Door, getInitialDoorState, getDoorActions } from './Door'
import { Tween } from './tween'

export default function App() {
  const bodyRef = useRef()
  const world = useWorld()


  // const [door, dispatch] = useSyncState(state => {
  //   const door = state.doors[name]
  //   if (door) {
  //     return door
  //   } else {
  //     return {
  //       open: startOpen,
  //       time: -999,
  //     }
  //   }
  // })


// Lower and Raise the Island
  // function open1() {
  //   dispatch('setDoor', name, !door.open, world.getServerTime())
  // }

  // useSignal('Open', open1)

  // useEffect(() => {
  //   const body = bodyRef.current
  //   const tween = door.open ? openTween : closeTween
  //   let t = world.getServerTime() - door.time
  //   return world.onUpdate(delta => {
  //     t += delta
  //     tween.set(t)
  //     body.setPositionY(tween.value.rotationY)
  //   })
  // }, [door.time])


  return (
    <app>
      <Door name="left" position={[0, 0, 0]} />
      <hdr color="red" />
      <rigidbody>
        <model src="0b.glb" collision="trimesh"/>
      </rigidbody>
      {/* <rigidbody type="kinematic" position={position}>
        <model 
          ref={bodyRef} 
          src="0b_far.glb" 
          collision="trimesh" />
      </rigidbody> */}
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


const initialState = {
  ...getInitialDoorState(),
}

export function getStore(state = initialState) {
  return {
    state,
    actions: {
      ...getDoorActions(),
    },
  }
}
