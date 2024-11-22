export default async function fetchThesaurusData(word: string) {
    
    try {
        const response = await fetch(`api/thesaurus?word=${word}`);
        const result = await response.json();

        // Logging
        console.log(`Query: ${JSON.stringify(result)}`)

        // Mapping over synonym and antonym data to add IDs to each
        const synsWithIds = result[0].meta.syns.map((syn: string, index: unknown) => ({
            syn: syn,
            id: index
        }))

        const antsWithIds = result[0].meta.ants.map((ant: string, index: unknown) => ({
            ant: ant,
            id: index
        }))

        console.log(`Synonym Data: ${JSON.stringify(synsWithIds)}`)
        console.log(`Antonym Data: ${JSON.stringify(antsWithIds)}`)
        console.log("returning data")

        return {
            "wordData": result,
            "synonymData": synsWithIds,
            "antonymData": antsWithIds
        }
    }
    catch (error) {
        console.error("Error fetching data: ", error)

        return{
            "wordData": null,
            "synonymData": null,
            "antonymData": null
        }
    }
}