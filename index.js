import React, { useRef, useEffect } from 'react'
import { useEngine } from 'hyperfy'

import { Tween } from './tween'

const anim = new Tween({ y: 0 })
  .wait(0)
  .to({ y: 6.28319 }, 10, Tween.LINEAR)
  .loop()

export default function Elevator() {
  const bodyRef = useRef()
  const engine = useEngine()

  useEffect(() => {
    const body = bodyRef.current
    return engine.onUpdate(() => {
      anim.set(engine.getServerTime())
      body.setRotationY(anim.value.y)
    })
  }, [])

  return (
    <environment>
      <hdr src="sky.hdr" />
      <skysphere src="sky2.jpg" />
      {/* models */}
      <rigidbody>
        <model src="boxes.glb" collision="trimesh" position={[-5, 0.5, -5]} allColliders="trimesh"/>
      </rigidbody>
      
      {/* elevator */}
      <rigidbody ref={bodyRef} type="kinematic" position={[0, 0, -5]}>
        <box size={[3, 0.1, 3]} color="blue" />
      </rigidbody>
     
      
      {/* random blocks for environment reference */}
      <box position={[-5, 0.5, -5]} rotation={[-5, 0.5, -5]}/>
      <box position={[5, 0.5, -5]} />

      {/* spawn point & ground */}
      <spawn />
      <rigidbody>
        <box color="#1c1d1c" size={[1000, 0.1, 1000]} position={[0, -0.1, 0]} />
      </rigidbody>
    </environment>
  )
}
