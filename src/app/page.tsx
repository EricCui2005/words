'use client'

import { useState, useEffect } from "react"

export default function Home() {

  // Tracking the status of the word
  const [wordMovedUp, setMovedUp] = useState(false)
  const [wordData, setData] = useState(null)
  const [definitionData, setDefinitionData] = useState(null)

  // Fetching word data once on component mount
  // Empty dependency array ensures data is fetched only once
  // on component mount
  useEffect(() => {

    // Function to asynchronously hit the dictionary API
    async function fetchData() {
      try {
        const response = await fetch("https://www.dictionaryapi.com/api/v3/references/collegiate/json/voluminous?key=6c1313af-ca6f-4a19-8443-6f49470c0e0d");
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
            <div className={`text-white text-7xl font-bold italic ${wordMovedUp ? '-translate-y-6 duration-1000' : 'translate-y-16 duration-1000'}`}>
              {wordData ? wordData[0].meta.id : "Loading..."}
            </div>
            {definitionData ? 
              definitionData.map((defData: unknown, index: unknown) => 
              <p key={defData.id} className={`text-white text-3xl -translate-y-10 transition-opacity duration-700 ${wordMovedUp ? 'opacity-100' : 'opacity-0'}`}>
                {`${index + 1}. ${defData.def}`}
              </p>) 
              : ""}
        </div>
      </div>
    </>
  )
}
