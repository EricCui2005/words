export default function Word({ word, moved }) {
    return (
        <>
            <div className={`text-white text-7xl font-bold italic ${moved ? '-translate-y-6 duration-1000' : 'translate-y-16 duration-1000'}`}>
              {word}
            </div>
        </>
    )
}