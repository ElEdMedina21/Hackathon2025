import { useNavigate } from "react-router-dom";

export default function NavBar() {
    const nav = useNavigate();

    return (
        <nav className="w-full flex items-center justify-between px-8 py-4 bg-[#FBFFE4] shadow-md">
            {/* Logo */}
            <p className="text-[#06D001] font-extrabold text-2xl tracking-wide">AjoloEnergy</p>

            {/* Botones de navegación */}
            <div className="flex gap-6">
                {[
                    { label: "General", path: "/" },
                    { label: "Configurar", path: "/config" }
                ].map(({ label, path }, index) => (
                    <button
                        key={index}
                        onClick={() => nav(path)}
                        className="px-5 py-2 text-lg font-semibold text-[#059212] bg-white rounded-full shadow 
                                   transition duration-300 ease-in-out 
                                   hover:bg-[#06D001] hover:text-white hover:shadow-lg 
                                   active:scale-95"
                    >
                        {label}
                    </button>
                ))}
            </div>
        </nav>
    );
}