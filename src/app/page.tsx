'use client'

import { useState, useEffect } from "react"

export default function Home() {

  // Tracking the status of the word
  const [movedUp, setMovedUp] = useState(false)

  useEffect(() => {

    // Word transition logic
    const wordTransition = () => {
      setMovedUp(!movedUp);
    }

    // Adding an event listener to detect a click anywhere on the document
    document.addEventListener('click', wordTransition)

    // Cleanup function
    return () => {
      document.removeEventListener('click', wordTransition)
    };
  }, [movedUp])

  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-8">
            <div className={`text-white text-7xl font-bold italic ${movedUp ? '-translate-y-6 duration-500' : 'translate-y-0 duration-500'}`}>Test</div>
            <p className="text-white text-4xl">
              1. Emitting light <br></br>
              2. Emitting light 
            </p>
        </div>
      </div>
    </>
  )
}
