"use client"

import { useState, useRef } from "react"
import Word from "@/components/word"
import Definition from "@/components/definition"
import useWordData from "@/utility/useWordData"

export default function DefinitionBlock({ parentSearchWord, setParentSearchWord }) {

    // Word to be searched and reference to input element
    const [searchWord, setSearchWord] = useState(parentSearchWord)
    const inputRef = useRef(null)

    // Fetched word data
    const { wordData, definitionData } = useWordData(searchWord)

    // Tracking the status of word position
    const [wordMovedUp, setMovedUp] = useState(false)
    

    // Handles word submission for definition fetch
    const handleSubmit = (e) => {
        e.preventDefault()
        const word = inputRef?.current?.value ? inputRef.current.value : "empty"
        setParentSearchWord(word)
        setSearchWord(word)
    }

    // Handling element visuals
    const handleClick = () => {
        setMovedUp(!wordMovedUp)
        console.log("Hello")
    }
    

    return (
        <>
            <Word className={"absolute z-0"} word={wordData ? wordData : "Loading..."} moved={wordMovedUp}/>
            <div onClick={handleClick} className="flex flex-col items-center justify-center gap-8 h-1/3 w-3/4 mb-8">
                <Definition definitions={definitionData ? definitionData : []} wordMoved={wordMovedUp}/>
            </div>
            <form onSubmit={handleSubmit}>
                <label>
                    <input ref={inputRef} defaultValue={""} className="h-8 p-4 rounded-full bg-transparent border-2 border-gray-300 text-white focus:outline-none" />
                </label> 
            </form>
        </>
    )
}
