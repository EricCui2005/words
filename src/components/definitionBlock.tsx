"use client"

import { useState, useEffect, useRef } from "react"
import Word from "@/components/word"
import Definition from "@/components/definition"
import fetchWordData from "@/utility/wordFetch"
import { WordData } from "@/utility/types"
import Hamburger from "hamburger-react"
import Menu from "@/components/menu"

export default function DefinitionBlock() {


  // Tracking the status of the word
  const [wordMovedUp, setMovedUp] = useState(false)

  // State variables of the word and its definition data
  const [wordData, setData] = useState<[WordData]>()
  const [definitionData, setDefinitionData] = useState()

  // useRef reference and searchWord state variable for word to be searched
  const [searchWord, setSearchWord] = useState<string>("hello")
  const inputRef = useRef<HTMLInputElement>(null)

  // Tracking whether the menu is open
  const [isOpen, setIsOpen] = useState(false)

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

  const handleToggle = () => {
    setIsOpen(!isOpen)
    
  }
  
  // Handling fetching definition data
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const word = inputRef?.current?.value ? inputRef.current.value : "empty"
    setSearchWord(word)
  }

  return (
    <>
      <div className="relative h-screen relative flex flex-col items-center justify-center">
        <Hamburger toggled={isOpen} onToggle={handleToggle}color="white" rounded></Hamburger>
        <Menu isOpen={isOpen} className={"absolute"}>
          <button>hi</button>
        </Menu>
        <div className={`absolute h-1/2 h-screen relative flex flex-col items-center justify-center transition-opacity duration-100 ${isOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
          <Word className={"absolute z-0"} word={wordData ? wordData : "Loading..."} moved={wordMovedUp}/>
          <div onClick={handleClick} className="flex flex-col items-center justify-center gap-8 h-1/3 w-3/4 mb-8">
              <Definition definitions={definitionData ? definitionData : []} wordMoved={wordMovedUp}/>
          </div>
          <form onSubmit={handleSubmit}>
            <label>
              <input ref={inputRef} defaultValue={""} className="h-8 p-4 rounded-full bg-transparent border-2 border-gray-300 text-white focus:outline-none" />
            </label> 
          </form>
        </div> 
      </div>
    </>
  )
}
