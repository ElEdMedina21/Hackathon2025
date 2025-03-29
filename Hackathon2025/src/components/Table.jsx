import { useEffect,useState } from "react";
import axios from "axios";

export default function Table(){
    const [tableData, setTable] = useState([])
    const [currentRoom, setRoom] = useState(0)
    const [isOpen, setOpen] = useState(false)
    const [openRow, setRow] = useState(null)
    const url = 'https://nxnsmxw7-8000.usw3.devtunnels.ms/articles/';

    const fetchData = async()=>{
        try{
            const response = await axios.get(url)
            setTable(response.data)
            console.log(response.data)
        }
        catch(error){
            console.error("Error fetching data: ", error)
        }
    }

    useEffect(()=>{
        fetchData()
        const interval = setInterval(()=>{
            fetchData()
        },1000)

        return ()=>clearInterval(interval)
    },[]);

    const openModal = (row)=>{
        setOpen(true)
        setRow(row)
    }

    return(
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
                                            <div className={`h-[50%] w-full border-e-2 border-b-2 flex justify-center items-center ${currentRoom == 1 ? 'bg-[#E1F060]' : ''}`}>
                                                <h2>1</h2>
                                            </div>
                                            <div className={`flex justify-center items-center h-[50%] w-full border-e-2 ${currentRoom == 2 ? 'bg-[#E1F060]' : ''}`}>
                                                <h2>2</h2>
                                            </div>
                                        </div>
                                        <div className={`flex justify-center items-center w-[55%] h-full ${currentRoom == 3 ? 'bg-[#E1F060]' : ''}`}>
                                            <h2>3</h2>
                                        </div>
                                    </div>
                                    <div className="w-[40%]"></div>
                                </div>
                                <div className="h-[50%] w-full flex">
                                    <div className={`w-[50%] border-2 border-e-0 flex justify-center items-center ${currentRoom == 4 ? 'bg-[#E1F060]' : ''}`}>
                                        <h2>4</h2>
                                    </div>
                                    <div className={`flex justify-center items-center w-[50%] border-2 ${currentRoom == 5 ? 'bg-[#E1F060]' : ''}`}>
                                        <h2>5</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-[55%] flex  justify-center py-2">
                        <table className="w-[85%] text-xl rounded-md drop-shadow-md bg-[#FBFFE4]">
                            <thead className="text-[#06D001]">
                                <tr>
                                    <th className="w-[10%] py-2">Id</th>
                                    <th className="w-[25%] py-2">Nombre</th>
                                    <th className="w-[20%] py-2">Consumo</th>
                                    <th className="w-[25%] py-2">C. Mes</th>
                                    <th className="w-[20%] py-2">Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((row,index)=>(
                                    <tr onMouseEnter={()=>{setRoom(row.habitacion)}} 
                                    onMouseLeave={()=>{setRoom(0)}}
                                    onClick={()=>{openModal(row)}}
                                    key={index} className="cursor-pointer border-1 border-[#8cc18b] hover:bg-[#E1F060]">
                                        <td className="w-[10%] py-1 text-center">{row.id}</td>
                                        <td className="w-[30%] py-1 text-center">{row.name}</td>

                                        <td className={`w-[20%] py-1 text-center font-bold 
                                        ${row.consumo_actual < 21 ? 'text-[#059212]' : ''}
                                        ${row.consumo_actual > 40 ? 'text-[#FE4F2D]' : '' }`}>
                                        {row.consumo_actual}</td>

                                        <td className={`w-[20%] py-1 text-center font-bold 
                                        ${row.consumo_estimado_mensual < 75 ? 'text-[#059212]' : '' }
                                        ${row.consumo_estimado_mensual > 141 ? 'text-[#FE4F2D]' : '' }
                                        `}>{row.consumo_estimado_mensual}</td>
                                    
                                        <td className={`w-[15%] py-1 text-center`}>
                                            ✅
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {isOpen && openRow && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black/75">
                            <div className="bg-[#FBFFE4] p-6 rounded-lg shadow-lg w-96">
                            <h2 className="text-xl font-bold">{openRow.name}</h2>
                            <p className="mt-2 text-gray-600">Consumo Actual: {openRow.consumo_actual} KW</p>
                            <p className="text-gray-600">Consumo Estimado Mensual: {openRow.consumo_estimado_mensual} KW</p>

                            <div className="flex w-full justify-center items-center">
                                <button
                                    onClick={() => setOpen(false)}
                                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
                                >
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
    )
}