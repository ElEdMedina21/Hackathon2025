import { useNavigate } from "react-router-dom"

export default function NavBar() {
    const nav = useNavigate()
    return (
        <>
            <nav className="w-full flex items-center justify-between px-6 py-4 drop-shadow-md bg-[#FBFFE4]">
                <p className="text-[#06D001] font-bold text-2xl">AjoloEnergy</p>
                <div className="flex gap-4">
                    <p onClick={() => nav(`/`)} className="text-[#059212] text-xl cursor-pointer">General</p>
                    <p onClick={() => nav(`/`)} className="text-[#059212] text-xl cursor-pointer">Planear</p>
                    <p onClick={() => nav(`/config`)} className="text-[#059212] text-xl cursor-pointer">Configurar</p>
                </div>
            </nav>
        </>
    )
}