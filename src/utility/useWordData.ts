import { useState, useEffect } from "react"
import { WordData } from "@/utility/types"
import fetchWordData from "@/utility/wordFetch"

export default function useWordData(searchWord: string) {

    const [wordData, setData] = useState<[WordData]>()
    const [definitionData, setDefinitionData] = useState()

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

    return {wordData, definitionData}

}