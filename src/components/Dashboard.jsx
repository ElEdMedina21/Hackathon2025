import { useState } from "react";
import ConsumoActual from "./ConsumoActual";
import ConsumoSemanal from "./ConsumoSemanal";
import ConsumoAnual from "./ConsumoAnual";
import GraficaPastel from "./GraficaPastel";
import Prediccion from "./Prediccion";

export default function Dashboard() {
    const [selectedGraph, setSelectedGraph] = useState("semanal");

    return (
        <div>
            <main>
                <section>
                    <div id="main" className="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">
                        <div className="flex flex-row flex-wrap flex-grow mt-2">
                            <div className="w-full md:w-1/2 xl:w-1/2 p-6">
                                {/* Graph Card */}
                                <div className="bg-white border-transparent rounded-lg shadow-xl">
                                    <div className="bg-gradient-to-b from-gray-300 to-gray-100 uppercase text-gray-800 border-b-2 border-gray-300 rounded-tl-lg rounded-tr-lg p-2">
                                        <h2 className="font-bold uppercase text-gray-600">Consumo de Energía Actual</h2>
                                    </div>
                                    <div>
                                        <ConsumoActual />
                                    </div>
                                </div>
                                {/* /Graph Card */}
                            </div>
                            <div className="w-full md:w-1/2 xl:w-1/2 p-6">
                                {/* Graph Card */}
                                <div className="bg-white border-transparent rounded-lg shadow-xl">
                                    <div className="bg-gradient-to-b from-gray-300 to-gray-100 uppercase text-gray-800 border-b-2 border-gray-300 rounded-tl-lg rounded-tr-lg p-2">
                                        <h2 className="font-bold uppercase text-gray-600">Consumo de Energía</h2>
                                        <select
                                            className="mt-2 p-1 border rounded"
                                            value={selectedGraph}
                                            onChange={(e) => setSelectedGraph(e.target.value)}
                                        >
                                            <option value="semanal">Semanal</option>
                                            <option value="anual">Anual</option>
                                        </select>
                                    </div>
                                    <div>
                                        {selectedGraph === "semanal" && <ConsumoSemanal />}
                                        {selectedGraph === "anual" && <ConsumoAnual />}
                                    </div>
                                </div>
                                {/* /Graph Card */}
                            </div>
                            <div className="w-full md:w-1/2 xl:w-1/2 p-6">
                                {/* Graph Card */}
                                <div className="bg-white border-transparent rounded-lg shadow-xl">
                                    <div className="bg-gradient-to-b from-gray-300 to-gray-100 uppercase text-gray-800 border-b-2 border-gray-300 rounded-tl-lg rounded-tr-lg p-2">
                                        <h2 className="font-bold uppercase text-gray-600">Consumo de Energía por Objeto</h2>
                                    </div>
                                    <div>
                                        <GraficaPastel />
                                    </div>
                                </div>
                                {/* /Graph Card */}
                            </div>
                            <div className="w-full md:w-1/2 xl:w-1/2 p-6">
                                {/* Graph Card */}
                                <div className="bg-white border-transparent rounded-lg shadow-xl">
                                    <div className="bg-gradient-to-b from-gray-300 to-gray-100 uppercase text-gray-800 border-b-2 border-gray-300 rounded-tl-lg rounded-tr-lg p-2">
                                        <h2 className="font-bold uppercase text-gray-600">Gráfica de Predicción</h2>
                                    </div>
                                    <div>
                                        <Prediccion />
                                    </div>
                                </div>
                                {/* /Graph Card */}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}