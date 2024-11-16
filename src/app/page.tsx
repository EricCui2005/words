'use client'

import { useState, useEffect, useRef } from "react"
import Word from "@/components/word"
import Definition from "@/components/definition"
import fetchWordData from "@/utility/wordFetch"
import { WordData } from "@/utility/types"

export default function Home() {

  // Tracking the status of the word
  const [wordMovedUp, setMovedUp] = useState(false)

  // State variables of the word and its definition data
  const [wordData, setData] = useState<[WordData]>()
  const [definitionData, setDefinitionData] = useState()

  // useRef reference and searchWord state variable for word to be searched
  const [searchWord, setSearchWord] = useState<string>("initial")
  const inputRef = useRef<HTMLInputElement>(null)

  // Searching for new word
  useEffect(() => {

    // Wrapping utility word data fetching function in async function
    const fetchData = async () => {
      try {
        const data = await fetchWordData(searchWord)

        let fetchedWord = data.wordData

        if (fetchedWord.includes(":")) {
          fetchedWord = fetchedWord.substring(0, fetchedWord.indexOf(":"))
        }
        
        setData(fetchedWord)
        setDefinitionData(data.definitionData)
      }
      catch (error) {
        console.error("Error fetching data: ", error)
      }
    }
    fetchData();
  }, [searchWord])

  // Handling move up state of word and definition status
  const handleClick = () => {
    setMovedUp(!wordMovedUp)
    console.log("Hello")
  }
  
  // Handling fetching definition data
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const word = inputRef?.current?.value ? inputRef.current.value : "empty"
    setSearchWord(word)
  }

  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center">
        <div onClick={handleClick} className="flex flex-col items-center justify-center gap-8">
            <Word word={wordData ? wordData[0]?.meta?.id : "Loading..."} moved={wordMovedUp}/>
            <Definition definitions={definitionData ? definitionData : []} wordMoved={wordMovedUp}/>
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            <input ref={inputRef} defaultValue={"Hello"} className="rounded-md" />
          </label> 
        </form>
      </div>
    </>
  )
}
