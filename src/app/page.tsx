'use client'

import { useState, useEffect } from "react"
import Word from "../components/word"
import Definition from "../components/definition"

export default function Home() {

  // Tracking the status of the word
  const [wordMovedUp, setMovedUp] = useState(false)
  const [wordData, setData] = useState<any[]>()
  const [definitionData, setDefinitionData] = useState<any>()

  // Fetching word data once on component mount
  // Empty dependency array ensures data is fetched only once
  // on component mount
  useEffect(() => {

    // Function to asynchronously hit the dictionary API
    async function fetchData() {
      try {
        const response = await fetch("api/definition?word=voluminous");
        const result = await response.json();
        setData(result)

        // Logging
        console.log(`Query: ${JSON.stringify(result)}`)

        // Mapping over definition data to add IDs to each
        const defsWithIds = result[0].shortdef.map((definition: unknown, index: unknown) => ({
          def: definition,
          id: index
        }))
        console.log(`Definition Data: ${JSON.stringify(defsWithIds)}`)
        setDefinitionData(defsWithIds)
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
