'use client'

import { useState, useEffect } from "react"
import Word from "@/components/word"
import Definition from "@/components/definition"
import fetchWordData from "@/utility/utility"

export default function Home() {

  // Tracking the status of the word
  const [wordMovedUp, setMovedUp] = useState(false)
  const [wordData, setData] = useState<any[]>()
  const [definitionData, setDefinitionData] = useState<any>()

  // Fetching word data once on component mount
  // Empty dependency array ensures data is fetched only once
  // on component mount
  useEffect(() => {

    // Wrapping utility word data fetching function in async function
    const fetchData = async () => {
      try {
        const data = await fetchWordData("voluminous")
        setData(data.wordData)
        setDefinitionData(data.definitionData)
      }
      catch (error) {
        console.error("Error fetching data: ", error)
      }
    }
    fetchData();
  }, [])

  // Adds a new listener each time with new word wordMovedUp state
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
            <Word word={wordData ? wordData[0]?.meta?.id : "Loading..."} moved={wordMovedUp}/>
            <Definition definitions={definitionData ? definitionData : []} wordMoved={wordMovedUp}/>
        </div>
      </div>
    </>
  )
}
