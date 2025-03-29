import { useEffect, useState } from "react";
import axios from "axios";

export default function Table() {
const [tableData, setTable] = useState([]);
const [currentRoom, setRoom] = useState(0);
const [isOpen, setOpen] = useState(false);
const [openRow, setRow] = useState(null);
const [toggles, setToggles] = useState([true,true,true,true,true,true,true,true,true,true,false]);
const url = "https://nxnsmxw7-8000.usw3.devtunnels.ms/";

const fetchData = async () => {
try {
    const response = await axios.get(`${url}articles/`);
    setTable(response.data);
} catch (error) {
    console.error("Error fetching data: ", error);
}
};

useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
        fetchData();
    }, 1000);

    return () => clearInterval(interval);
}, []);

const openModal = (row) => {
setOpen(true);
setRow(row);
};

const handleToggle = (id) => {
setToggles((prevToggles) => ({
    ...prevToggles,
    [id]: !prevToggles[id],
}));
};

return (
<>
    <div className="my-2 px-4">
    <h1 className="text-3xl font-bold">Tomacorrientes Configurados</h1>
    <div className="flex items-start pt-2">
        <div className="w-[45%] py-2">
        <div className="w-full bg-[#FBFFE4] h-[550px] flex flex-col items-center justify-center ">
            <div className="w-[85%] h-[85%]">
            <div className="h-[50%] w-full flex">
                <div className="w-[70%] flex h-full border-t-2 border-s-2 border-e-2">
                <div className="w-[45%] h-full">
                    <div className={`h-[50%] w-full border-e-2 border-b-2 flex justify-center items-center ${currentRoom == 1 ? "bg-[#E1F060]" : ""}`}>
                    <h2>1</h2>
                    </div>
                    <div className={`flex justify-center items-center h-[50%] w-full border-e-2 ${currentRoom == 2 ? "bg-[#E1F060]" : ""}`}>
                    <h2>2</h2>
                    </div>
                </div>
                <div className={`flex justify-center items-center w-[55%] h-full ${currentRoom == 3 ? "bg-[#E1F060]" : ""}`}>
                    <h2>3</h2>
                </div>
                </div>
                <div className="w-[40%]"></div>
            </div>
            <div className="h-[50%] w-full flex">
                <div className={`w-[50%] border-2 border-e-0 flex justify-center items-center ${currentRoom == 4 ? "bg-[#E1F060]" : ""}`}>
                <h2>4</h2>
                </div>
                <div className={`flex justify-center items-center w-[50%] border-2 ${currentRoom == 5 ? "bg-[#E1F060]" : ""}`}>
                <h2>5</h2>
                </div>
            </div>
            </div>
        </div>
        </div>
        <div className="w-[55%] flex justify-center py-2">
        <table className="w-[85%] text-xl rounded-md drop-shadow-md bg-[#FBFFE4] table-auto">
            <thead className="text-[#06D001]">
            <tr>
                <th className="py-2">Id</th>
                <th className="py-2">Nombre</th>
                <th className="py-2">Consumo</th>
                <th className="py-2">C. Mes</th>
                <th className="py-2">Estado</th>
                <th className="py-2">Toggle</th>
            </tr>
            </thead>
            <tbody>
            {tableData.map((row, index) => (
                <tr
                onMouseEnter={() => {
                    setRoom(row.habitacion);
                }}
                onMouseLeave={() => {
                    setRoom(0);
                }}
                onClick={() => {
                    openModal(row);
                }}
                key={index}
                className={`border-1 border-[#8cc18b] ${toggles[row.id] ? 'hover:bg-[#E1F060]' : 'bg-[#D1D1D1]'}`}
                >
                <td className="py-1 text-center">{row.id + 1}</td>
                <td className="py-1 text-center">{row.name}</td>
                <td
                    className={`py-1 text-center font-bold ${row.consumo_actual < 21 ? "text-[#059212]" : ""} ${row.consumo_actual > 40 ? "text-[#FE4F2D]" : ""}`}
                >
                    {toggles[row.id] && row.consumo_actual}
                </td>
                <td
                    className={`py-1 text-center font-bold ${row.consumo_estimado_mensual < 75 ? "text-[#059212]" : ""} ${row.consumo_estimado_mensual > 141 ? "text-[#FE4F2D]" : ""}`}
                >
                    {toggles[row.id] && row.consumo_estimado_mensual}
                </td>
                <td className={`py-1 text-center`}>{toggles[row.id] && row.analisis_emoji}</td>
                <td className="py-1 text-center">
                    <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleToggle(row.id);
                    }}
                    >
                    {toggles[row.id] ? 'ON' : 'OFF'}
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        {isOpen && openRow && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/75">
            <div className="bg-[#FBFFE4] p-6 rounded-lg shadow-lg w-[50%]">
                <h2 className="text-xl font-bold text-center">{openRow.name}</h2>
                <p className="mt-2 text-gray-600">
                <b>Consumo Actual:</b> {openRow.consumo_actual} KW
                </p>
                <p className="text-gray-600">
                <b>Consumo Estimado Mensual:</b> {openRow.consumo_estimado_mensual} KW
                </p>
                <p className="mt-2">{openRow.analisis_text}</p>
                <div className="flex w-full justify-center items-center">
                <button onClick={() => setOpen(false)} className="mt-4 px-4 py-2 cursor-pointer bg-red-500 text-white rounded-md hover:bg-red-700">
                    Cerrar
                </button>
                </div>
            </div>
            </div>
        )}
        </div>
    </div>
    </div>
</>
);
}