export default function NavBar(){
    return(
        <>
            <nav className="w-full flex items-center justify-between px-6 py-4 drop-shadow-md bg-[#FBFFE4]">
                <p className="text-[#06D001] font-bold text-2xl">AjoloEnergy</p>
                <div className="flex gap-4">
                    <p className="text-[#059212] text-xl">General</p>
                    <p className="text-[#059212] text-xl">Planear</p>
                    <p className="text-[#059212] text-xl">Configurar</p>
                </div>
            </nav>
        </>
    )
}