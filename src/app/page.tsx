"use client"

import { SetStateAction, useState } from "react"
import Hamburger from "hamburger-react"
import Menu from "@/components/menu"
import DefinitionBlock from "@/components/definitionBlock"
import SynonymBlock from "@/components/synonymBlock"
import Button from '@mui/material/Button';

export default function Home() {

  const [isOpen, setIsOpen] = useState(false)

  const [blockType, setBlockType] = useState("def")
  const handleToggle = () => {
    setIsOpen(!isOpen)
  }
  const handleClick = (e: any) => {
    setBlockType(e.target.id)
  }
  
  return (
    <>
      <div className="relative h-screen relative flex flex-col items-center justify-center">
          <Hamburger toggled={isOpen} onToggle={handleToggle} color="white" rounded></Hamburger>
          <Menu isOpen={isOpen} className={"absolute"}>
            <Button variant="outlined" sx={{ width: 300, color: 'white' }} id="def" onClick={handleClick}>Definition</Button>
            <Button variant="outlined" sx={{ width: 300, color: 'white' }} id="syn" onClick={handleClick}>Synonym</Button>
            <Button variant="outlined" sx={{ width: 300, color: 'white' }} id="ant" onClick={handleClick}>Antonym</Button>
          </Menu>
          <div className={`absolute h-1/2 h-screen relative flex flex-col items-center justify-center transition-opacity duration-100 ${isOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
            {blockType == "def" && <DefinitionBlock/>}
            {blockType == "syn" && <SynonymBlock/>}
          </div>
      </div>
    </>
  )
}
