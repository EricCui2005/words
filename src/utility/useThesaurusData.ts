import { useState, useEffect } from "react"
import { ThesaurusData } from "@/utility/types"
import fetchThesaurusData from "@/utility/thesaurusFetch"

export default function useWordData(searchWord: string) {

    const [wordData, setData] = useState<[ThesaurusData]>()
    const [synonymData, setSynonymData] = useState()
    const [antonymData, setAntonymData] = useState()

    // Searching for new word
    useEffect(() => {

        // Wrapping utility word data fetching function in async function
        const fetchData = async () => {
        try {
            const data = await fetchThesaurusData(searchWord)

            let word = data.wordData[0].meta.id

            if (word.includes(":")) {
                word = word.substring(0, word.indexOf(":"))
            }

            setData(word)
            setSynonymData(data.synonymData)
            setAntonymData(data.antonymData)
        }
        catch (error) {
            console.error("Error fetching data: ", error)
        }
        }
        fetchData();
    }, [searchWord])

    return {wordData, synonymData, antonymData}

}