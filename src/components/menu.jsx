export default function Menu({ children, isOpen, className }) {

    // Menu component
    return (
        <>
            <div className={`flex flex-col gap-8 menu-component ${className} absolute z-10 flex flex-col justify-center items-center rounded-xl text-white w-96 h-64 bg-blue-700 transition-opacity 
                duration-500 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                    {children}
            </div>
        </>
    )
}