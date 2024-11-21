export default function Synonym({ synonyms, wordMoved }) {
    return(
        <>
            {synonyms.map((synData, index) => 
              <p key={index} className={`text-white text-3xl select-none -translate-y-2 transition-opacity duration-700 ${wordMoved ? 'opacity-100' : 'opacity-0'}`}>
                {`${index + 1}. ${synData}`}
              </p>)}
        </>
    )
}