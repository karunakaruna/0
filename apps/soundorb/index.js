import React, { useRef, useEffect } from 'react'
import { useWorld, DEG2RAD } from 'hyperfy'

import { Tween } from './tween'

const anim = new Tween({ y: 0, r: 0 })
  .wait(1)
  .to({ y: 6, r: 360 }, 3, Tween.QUAD_IN_OUT)
  .wait(1)
  .to({ y: 0, r: 0 }, 3, Tween.QUAD_IN_OUT)
  .loop()

export default function App() {
  const bodyRef = useRef()
  const world = useWorld()

  return (
    <app>
      <rigidbody>
        <model src="sphere.glb"/>
      </rigidbody>
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
