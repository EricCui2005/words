"use client"

import { useState, useRef } from "react"
import Word from "@/components/word"
import Synonym from "@/components/synonyms"
import useThesaurusData from "@/utility/useThesaurusData"

export default function SynonymBlock() {

    // Word to be searched and reference to input element
    const [searchWord, setSearchWord] = useState<string>("hello")
    const inputRef = useRef<HTMLInputElement>(null)

    // Fetched word data
    const { wordData, thesaurusData } = useThesaurusData(searchWord)

    // Tracking the status of word position
    const [wordMovedUp, setMovedUp] = useState(false)
    
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
    
    return (
        <>
            <Word className={"absolute z-0"} word={wordData ? wordData : "Loading..."} moved={wordMovedUp}/>
            <div onClick={handleClick} className="flex flex-col items-center justify-center gap-8 h-1/3 w-3/4 mb-8">
                <Synonym synonyms={thesaurusData ? thesaurusData[0].syn : []} wordMoved={wordMovedUp}></Synonym>
            </div>
            <form onSubmit={handleSubmit}>
                <label>
                    <input ref={inputRef} defaultValue={""} className="h-8 p-4 rounded-full bg-transparent border-2 border-gray-300 text-white focus:outline-none" />
                </label> 
            </form>
        </>
    )
}
