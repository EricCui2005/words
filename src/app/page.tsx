"use client"

import { useState } from "react"
import Hamburger from "hamburger-react"
import Menu from "@/components/menu"
import DefinitionBlock from "@/components/definitionBlock"
import SynonymBlock from "@/components/synonymBlock"
import AntonymBlock from "@/components/antonymBlock"
import MenuButton from "@/components/menuButton"

export default function Home() {

  const [isOpen, setIsOpen] = useState(false)
  const [parentSearchWord, setParentSearchWord] = useState("hello")

  const [blockType, setBlockType] = useState("def")
  const handleToggle = () => {
    setIsOpen(!isOpen)
  }
  
  return (
    <>
      <div className="relative h-screen relative flex flex-col items-center justify-center">
          <Hamburger toggled={isOpen} onToggle={handleToggle} color="white" rounded></Hamburger>
          <Menu isOpen={isOpen} className={"absolute"}>
            <MenuButton text="Definition" id="def" setParentState={setBlockType} selected={blockType == "def"}/>
            <MenuButton text="Synonyms" id="syn" setParentState={setBlockType} selected={blockType == "syn"}/>
            <MenuButton text="Antonyms" id="ant" setParentState={setBlockType} selected={blockType == "ant"}/>
          </Menu>
          <div className={`absolute h-1/2 h-screen relative flex flex-col items-center justify-center transition-opacity duration-100 ${isOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
            {blockType == "def" && <DefinitionBlock parentSearchWord={parentSearchWord} setParentSearchWord={setParentSearchWord}/>}
            {blockType == "syn" && <SynonymBlock parentSearchWord={parentSearchWord} setParentSearchWord={setParentSearchWord}/>}
            {blockType == "ant" && <AntonymBlock parentSearchWord={parentSearchWord} setParentSearchWord={setParentSearchWord}/>}
          </div>
      </div>
    </>
  )
}
