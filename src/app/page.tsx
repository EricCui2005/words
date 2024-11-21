"use client"

import { useState } from "react"
import Hamburger from "hamburger-react"
import Menu from "@/components/menu"
import DefinitionBlock from "@/components/definitionBlock"

export default function Home() {

  const [isOpen, setIsOpen] = useState(false)
  const handleToggle = () => {
    setIsOpen(!isOpen)
  }
  
  return (
    <>
      <div className="relative h-screen relative flex flex-col items-center justify-center">
          <Hamburger toggled={isOpen} onToggle={handleToggle}color="white" rounded></Hamburger>
          <Menu isOpen={isOpen} className={"absolute"}>
            <button>hi</button>
          </Menu>
        <div className={`absolute h-1/2 h-screen relative flex flex-col items-center justify-center transition-opacity duration-100 ${isOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
          <DefinitionBlock/>
        </div>
      </div>
    </>
  )
}
