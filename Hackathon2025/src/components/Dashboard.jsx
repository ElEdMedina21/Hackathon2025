import ConsumoActual from "./ConsumoActual";

export default function Dashboard() {
    return (
        <div>
            <main>
                <section>
                    <div id="main" className="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">
                        <div className="flex flex-row flex-wrap flex-grow mt-2">
                            <div className="w-full md:w-1/2 xl:w-1/3 p-6">
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
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}