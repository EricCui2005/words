export default function Word({ word, moved, className }) {
    return (
        <>
            <div className={`${className} text-white select-none text-7xl font-bold italic ${moved ? '-translate-y-44 duration-1000' : 'translate-y-0 duration-1000'}`}>
              {word}
            </div>
        </>
    )
}