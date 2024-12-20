export default function Definition({ definitions, wordMoved }) {
    return(
        <>
            {definitions.map((defData, index) => 
              <p key={defData.id} className={`text-white text-3xl select-none -translate-y-2 transition-opacity duration-700 ${wordMoved ? 'opacity-100' : 'opacity-0'}`}>
                {`${index + 1}. ${defData.def}`}
              </p>)}
        </>
    )
}