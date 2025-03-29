import React from 'react';
import logo from '../assets/logo.png'; // Verifica que la ruta sea correcta
import '../background.css'; // Asegúrate de que el CSS esté en la ruta indicada

export default function Home({ onEnter }) {
    return (
        <div className="relative min-h-screen">
            {/* Capas de fondo */}
            <div className="absolute inset-0 z-0">
                <div className="bg"></div>
                <div className="bg bg2"></div>
                <div className="bg bg3"></div>
            </div>

            {/* Contenedor de contenido con fondo semitransparente */}
            <div className="relative z-10 flex flex-col min-h-screen bg-white/80">
                {/* Header: espacio para el logo y nombre del proyecto */}
                <header className="py-4 px-4 border-b border-gray-200">
                    <div className="flex items-center justify-center">
                        <img src={logo} alt="Logo" className="w-12 h-12 rounded-full mr-2" />
                        <span className="text-xl font-bold text-gray-800">Nombre del Proyecto</span>
                    </div>
                </header>

                {/* Contenido principal centrado */}
                <main className="flex-1 flex flex-col justify-center items-center px-4 text-center">
                    <h1 className="text-4xl font-bold text-gray-800">
                        Ahorro de Energía en el Hogar
                    </h1>
                    <p className="mt-4 text-lg text-gray-600">
                        Un asistente inteligente que analiza tu consumo y sugiere optimizaciones para reducir costos y cuidar el medio ambiente.
                    </p>
                    <button
                        onClick={onEnter}
                        className="mt-8 bg-[#059212] text-white py-2 px-6 rounded hover:bg-[#047b11] transition-colors"
                    >
                        Comienza Ahora
                    </button>
                </main>

                {/* Footer siempre al fondo */}
                <footer className="bg-[#059212] text-white text-center py-4">
                    <p>© 2025 - Proyecto con Paleta de Verdes</p>
                </footer>
            </div>
        </div>
    );
}