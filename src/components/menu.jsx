import { useEffect, useState } from "react"

export default function Menu({ isOpen }) {
    const [shouldRender, setShouldRender] = useState(false)

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true)
        } else {
            const timeout = setTimeout(() => setShouldRender(false), 500)
            return () => clearTimeout(timeout)
        }
    }, [isOpen])

    return (
        <>
            {shouldRender && <div className={`absolute z-10 rounded w-48 h-48 bg-blue-500 transition-opacity 
                duration-500 ${isOpen ? "opacity-100" : "opacity-0"}`}>
            </div>}
        </>
    )
}