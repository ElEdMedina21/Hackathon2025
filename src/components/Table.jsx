import { useEffect,useState } from "react";
import axios from "axios";

export default function Table(){
    const [tableData, setTable] = useState([])
    const url = 'https://bk4k8k3h-8000.usw3.devtunnels.ms/articles/';

    const fetchData = async()=>{
        try{
            const response = await axios.get(url)
            setTable(response)
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
                <div className="w-[100%] flex justify-center items-center my-4">
                    <table className="w-[60%] text-xl rounded-md drop-shadow-md">
                        <thead className="text-[#06D001] bg-[#FBFFE4]">
                            <tr>
                                <th className="w-[15%] py-1">Id</th>
                                <th className="w-[25%] py-1">Nombre</th>
                                <th className="w-[30%] py-1">Consumo KW</th>
                                <th className="w-[30%] py-1">Costo Estimado</th>
                            </tr>
                        </thead>
                        {/* <tbody>
                            {tableData.map((row)=>(
                                <tr>
                                    <td className="w-[15%]">{row.id}</td>
                                    <td className="w-[25%]">{row.name}</td>
                                    <td className="w-[30%]">{row.consumo_actual}</td>
                                    <td className="w-[30%]">{row.consumo_estimado_mensual}</td>
                                </tr>
                            ))}
                        </tbody> */}
                    </table>
                </div>
            </div>
        </>
    )
}