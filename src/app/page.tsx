'use client'

import { useState, useEffect } from "react"
import Word from "@/components/word"
import Definition from "@/components/definition"
import fetchWordData from "@/utility/wordFetch"
import { WordData } from "@/utility/types"
import { TextField } from "@mui/material"

export default function Home() {

  // Tracking the status of the word
  const [wordMovedUp, setMovedUp] = useState(false)
  const [wordData, setData] = useState<[WordData]>()
  const [definitionData, setDefinitionData] = useState()

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
  // useEffect(() => {

  //   // Word transition logic
  //   const wordTransition = () => {
  //     setMovedUp(!wordMovedUp);
  //   }

  //   // Adding an event listener to detect a click anywhere on the document
  //   document.addEventListener('click', wordTransition)

  //   // Cleanup function
  //   return () => {
  //     document.removeEventListener('click', wordTransition)
  //   };
  // }, [wordMovedUp])

  const handleClick = (target) => {
    setMovedUp(!wordMovedUp)
    console.log("Hello")
  }

  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center">
        <div onClick={handleClick} className="flex flex-col items-center justify-center gap-8">
            <Word word={wordData ? wordData[0]?.meta?.id : "Loading..."} moved={wordMovedUp}/>
            <Definition definitions={definitionData ? definitionData : []} wordMoved={wordMovedUp}/>
        </div>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" sx={{
    width: '300px',
    marginTop: 2,          // converts to 16px (1 = 8px)
    backgroundColor: '#fff',
    borderRadius: 10,       // converts to 8px
  }}/>
      </div>
    </>
  )
}
