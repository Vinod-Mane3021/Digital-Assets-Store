"use client"

import { PRODUCT_CATEGORIES } from "@/config"
import { useEffect, useRef, useState } from "react"
import NavItem from "./NavItem"
import { useOnClickOutside } from "@/hooks/use-onClick-outside"
import { useOnClickKeyboardButton } from "@/hooks/use-onClick-KeyboardButton"

const NavItems = () => {  
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const isAnyOpen = activeIndex !== null
  const navRef = useRef<HTMLDivElement | null>(null)

  // close the navbar when user clicks outside the navbar
  useOnClickOutside(navRef, () => setActiveIndex(null))

  // close the navbar when user clicks the escape button
  useOnClickKeyboardButton("Escape", () => setActiveIndex(null))

  const handleOpen = (currentIndex: number) => {
    if(activeIndex === currentIndex) {
      setActiveIndex(null)
    } else {
      setActiveIndex(currentIndex);
    }
  }

  return (
    <div ref={navRef} className="flex gap-4 h-full items-center">
      {PRODUCT_CATEGORIES.map((category, index) => {
        const isOpen = index === activeIndex;
        return <div key={index}>
          <NavItem
            key={category.value}
            category={category}
            handleOpen={() => handleOpen(index)}
            isOpen={isOpen}
            isAnyOpen={isAnyOpen}
          />
        </div>
      })}
    </div>
  )
}

export default NavItems