import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ConsumoAnual = () => {
    const [labels, setLabels] = useState([]);
    const [values, setValues] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://nxnsmxw7-8000.usw3.devtunnels.ms/yearly_article_consume/");
                console.log("API Response:", response.data);

                const dataObject = response.data.data;
                const años = Object.keys(dataObject); 
                const consumos = Object.values(dataObject);
                
                setLabels(años);
                setValues(consumos);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const chartData = {
        labels: labels,
        datasets: [{
            label: "Consumo de Energía por Año (kWh)",
            data: values,
            backgroundColor: [
                "#FF6384", // Rojo
                "#36A2EB", // Azul
                "#FFCE56", // Amarillo
                "#4BC0C0", // Verde
                "#9966FF"  // Morado
            ],
            borderColor: "#FFFFFF", // Blanco para bordes
            borderWidth: 1
        }]
    };
    
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false // Oculta las leyendas
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <div>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default ConsumoAnual;