export default function Menu({ isOpen, className }) {

    return (
        <>
            <div className={`${className} absolute z-10 flex flex-col justify-center items-center rounded-lg text-white w-80 h-96 bg-blue-600 transition-opacity 
                duration-500 ${isOpen ? "opacity-90" : "opacity-0 pointer-events-none"}`}>
            </div>
        </>
    )
}