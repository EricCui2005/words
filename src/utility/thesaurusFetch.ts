export default async function fetchThesaurusData(word: string) {
    
    try {
        const response = await fetch(`api/thesaurus?word=${word}`);
        const result = await response.json();

        // Logging
        console.log(`Query: ${JSON.stringify(result)}`)

        // Mapping over synonym data to add IDs to each
        const synsWithIds = result[0].meta.syns.map((syn: string, index: unknown) => ({
            syn: syn,
            id: index
        }))
        console.log(`Synonym Data: ${JSON.stringify(synsWithIds)}`)
        console.log("returning data")

        return {
            "wordData": result,
            "synonymData": synsWithIds
        }
    }
    catch (error) {
        console.error("Error fetching data: ", error)

        return{
            "wordData": null,
            "synonymData": null
        }
    }
}