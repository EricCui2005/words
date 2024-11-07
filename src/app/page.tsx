'use client'

import { useState, useEffect } from "react"

export default function Home() {

  // Tracking the status of the word
  const [wordMovedUp, setMovedUp] = useState(false)

  // Debugging
  useEffect(() => {
    console.log(wordMovedUp)
  }, [wordMovedUp])

  useEffect(() => {

    // Word transition logic
    const wordTransition = () => {
      setMovedUp(!wordMovedUp);
    }

    // Adding an event listener to detect a click anywhere on the document
    document.addEventListener('click', wordTransition)

    // Cleanup function
    return () => {
      document.removeEventListener('click', wordTransition)
    };
  }, [wordMovedUp])

  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-8">
            <div className={`text-white text-7xl font-bold italic ${wordMovedUp ? '-translate-y-6 duration-1000' : 'translate-y-16 duration-1000'}`}>Test</div>
            <p className={`text-white text-4xl -translate-y-10 transition-opacity duration-700 ${wordMovedUp ? 'opacity-100' : 'opacity-0'}`}>
              1. Emitting light <br></br>
              2. Intensely passionate 
            </p>
        </div>
      </div>
    </>
  )
}
