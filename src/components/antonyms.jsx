export default function Antonym({ antonyms, wordMoved }) {
    return(
        <>
            {antonyms.map((antData, index) => 
              <p key={index} className={`text-white text-3xl select-none -translate-y-2 transition-opacity duration-700 ${wordMoved ? 'opacity-100' : 'opacity-0'}`}>
                {`${index + 1}. ${antData}`}
              </p>)}
        </>
    )
}