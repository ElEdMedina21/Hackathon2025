import { useEffect,useState } from "react";
import axios from "axios";

export default function Table(){
    const [tableData, setTable] = useState([])
    const url = 'https://bk4k8k3h-8000.usw3.devtunnels.ms/articles/';

    const fetchData = async()=>{
        try{
            const response = await axios.get(url)
            setTable(response.data)
            console.log(tableData)
        }
        catch(error){
            console.error("Error fetching data: ", error)
        }
    }

    useEffect(()=>{
        fetchData()
    },[])

    return(
        <>
            <div className="my-2 px-4">
                <h1 className="text-3xl font-bold">Tomacorrientes Configurados</h1>
                <div className="w-[100%] flex justify-center items-center mt-5">
                    <table className="w-[60%] text-xl rounded-md drop-shadow-md bg-[#FBFFE4]">
                        <thead className="text-[#06D001]">
                            <tr>
                                <th className="w-[15%] py-1">Id</th>
                                <th className="w-[25%] py-1">Nombre</th>
                                <th className="w-[30%] py-1">Consumo Actual</th>
                                <th className="w-[30%] py-1">Consumo Mensual</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((row,index)=>(
                                <tr key={index} className="border-1 border-[#8cc18b]">
                                    <td className="w-[15%] py-1 text-center">{row.id}</td>
                                    <td className="w-[25%] py-1 text-center">{row.name}</td>

                                    <td className={`w-[30%] py-1 text-center font-bold 
                                    ${row.consumo_actual < 21 ? 'text-[#059212]' : ''}
                                    ${row.consumo_actual > 40 ? 'text-[#FE4F2D]' : '' }`}>
                                    {row.consumo_actual}</td>

                                    <td className={`w-[30%] py-1 text-center font-bold 
                                    ${row.consumo_estimado_mensual < 75 ? 'text-[#059212]' : '' }
                                    ${row.consumo_estimado_mensual > 141 ? 'text-[#FE4F2D]' : '' }
                                    `}>{row.consumo_estimado_mensual}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}