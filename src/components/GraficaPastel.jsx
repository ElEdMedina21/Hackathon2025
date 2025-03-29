import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const GraficaPastel = () => {
    const [labels, setLabels] = useState([]);
    const [values, setValues] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://nxnsmxw7-8000.usw3.devtunnels.ms/pie_article_consume/");
                console.log("API Response:", response.data);

                const dispositivos = response.data; 
                const nombres = dispositivos.map(item => item.nombre); 
                const consumos = dispositivos.map(item => item.consumo_actual);
                
                setLabels(nombres);
                setValues(consumos);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 150);

        return () => clearInterval(interval);
    }, []);

    const chartData = {
        labels: labels,
        datasets: [{
            label: "Consumo de Energía (kWh)",
            data: values,
            backgroundColor: [
                "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF",
                "#FF9F40", "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"
            ],
            borderColor: "#fff",
            borderWidth: 1
        }]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            }
        }
    };

    return (
        <div>
            <Doughnut data={chartData} options={options} />
        </div>
    );
};

export default GraficaPastel;