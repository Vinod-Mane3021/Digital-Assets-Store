import { useEffect } from "react"


export const useOnClickKeyboardButton = (
    pressedKeyboardButton: string,
    handler: (event: Event) => void
) => {
    useEffect(() => {
        const eventHandler = (e: KeyboardEvent) => {
          if(e.key === pressedKeyboardButton) {
            handler(e)
          }
        }
        document.addEventListener("keydown", eventHandler)
        // to prevent memory leaks, cleanup
        return () => {
          document.removeEventListener("keydown", eventHandler)
        }
      }, [])
}



