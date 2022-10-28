import React, { useRef, useSyncState, useState } from 'react'

/**
 * This recipe shows how to make a video play when you get near it (and stop when you walk away) using a trigger box
           onLeave={() => audioRef.current.pause()}
           const colorRef = useRef()
 */


export default function App() {
  const audioRef = useRef()
  const [color, setColor] = useState('white');

  const changeColor = () => {
    setColor('black');
  }




  return (
    <app>
      <group position={[0, 0, 0]}>

        <audio 
          ref={audioRef}
          src="chime1.wav" 
          volume="5"
          position={[0, 0, 0]} 
          autoplay={false} 
          spatial={true} 
          loop={false} />
        <box 
          size={[.2, .2, .2]} 
          color={color}
          onClick={changeColor}/>
       
        <trigger
          size={2}
          onEnter={() => 
            audioRef.current.play()
          }
        />
      </group>
    </app>
  ) 
}
