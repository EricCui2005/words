export default function Word({ word, moved }) {
    return (
        <>
            <div className={`text-white select-none text-7xl font-bold italic ${moved ? '-translate-y-0 duration-1000' : 'translate-y-48 duration-1000'}`}>
              {word}
            </div>
        </>
    )
}