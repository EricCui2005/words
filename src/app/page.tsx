"use client"

import { useState, useEffect, useRef } from "react"
import Word from "@/components/word"
import Definition from "@/components/definition"
import fetchWordData from "@/utility/wordFetch"
import { WordData } from "@/utility/types"
import Hamburger from "hamburger-react"

export default function Home() {


  // Tracking the status of the word
  const [wordMovedUp, setMovedUp] = useState(false)

  // State variables of the word and its definition data
  const [wordData, setData] = useState<[WordData]>()
  const [definitionData, setDefinitionData] = useState()

  // useRef reference and searchWord state variable for word to be searched
  const [searchWord, setSearchWord] = useState<string>("hello")
  const inputRef = useRef<HTMLInputElement>(null)

  // Searching for new word
  useEffect(() => {

    // Wrapping utility word data fetching function in async function
    const fetchData = async () => {
      try {
        const data = await fetchWordData(searchWord)

        let word = data.wordData[0].meta.id

        if (word.includes(":")) {
          word = word.substring(0, word.indexOf(":"))
        }
       
        setData(word)
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
      <Hamburger color="white"></Hamburger>
      <div className="h-screen flex flex-col items-center justify-center">
        <Word word={wordData ? wordData : "Loading..."} moved={wordMovedUp}/>
        <div onClick={handleClick} className="flex flex-col items-center justify-center gap-8 h-1/3 w-3/4 mb-8">
            <Definition definitions={definitionData ? definitionData : []} wordMoved={wordMovedUp}/>
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            <input ref={inputRef} defaultValue={""} className="h-8 p-4 rounded-full bg-transparent border border-gray-100 text-white focus:outline-none" />
          </label> 
        </form>
      </div>
    </>
  )
}
