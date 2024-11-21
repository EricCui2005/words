"use client"

import { useState, useRef } from "react"
import Word from "@/components/word"
import Definition from "@/components/definition"
import Hamburger from "hamburger-react"
import useWordData from "@/utility/useWordData"

export default function DefinitionBlock({ render } : { render: boolean }) {

  // Word to be searched and reference to input element
  const [searchWord, setSearchWord] = useState<string>("hello")
  const inputRef = useRef<HTMLInputElement>(null)

  // Fetched word data
  const { wordData, definitionData } = useWordData(searchWord)

  // Tracking the status of word position
  const [wordMovedUp, setMovedUp] = useState(false)
  const [isOpen, setIsOpen] = useState(render)

  // Handles word submission for definition fetch
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const word = inputRef?.current?.value ? inputRef.current.value : "empty"
    setSearchWord(word)
  }

  // Handling element visuals
  const handleClick = () => {
    setMovedUp(!wordMovedUp)
    console.log("Hello")
  }
  const handleToggle = () => {
    setIsOpen(!isOpen)
  }
  

  return (
    <>
      <div className="relative h-screen relative flex flex-col items-center justify-center">
        <Hamburger toggled={isOpen} onToggle={handleToggle}color="white" rounded></Hamburger>
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
