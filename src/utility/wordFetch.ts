export default async function fetchDefData(word: string) {
    
    try {
        const response = await fetch(`api/definition?word=${word}`);
        const result = await response.json();

        // Logging
        console.log(`Query: ${JSON.stringify(result)}`)

        // Mapping over definition data to add IDs to each
        const defsWithIds = result[0].shortdef.map((definition: unknown, index: unknown) => ({
        def: definition,
        id: index
        }))
        console.log(`Definition Data: ${JSON.stringify(defsWithIds)}`)
        console.log("returning data")

        return {
            "wordData": result,
            "definitionData": defsWithIds
        }
    }
    catch (error) {
        console.error("Error fetching data: ", error)

        return{
            "wordData": null,
            "definitionData": null
        }
    }
}