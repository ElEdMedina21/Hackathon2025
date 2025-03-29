import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const ConsumoActual = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://nxnsmxw7-8000.usw3.devtunnels.ms/article_consume/");
                console.log("API Response:", response.data);

                const newValue = response.data.data[0] || 0; 

                setData(prev => [...prev.slice(-19), newValue]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        const interval = setInterval(fetchData, 250);

        return () => clearInterval(interval);
    }, []);

    const chartData = {
        labels: data.map((_, i) => i),
        datasets: [{
            label: "Consumo de Energía (kW)",
            data: data,
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.2)",
            fill: true,
            tension: 0.3,
            pointRadius: 0
        }]
    };

    const options = {
        responsive: true,
        scales: {
            x: { display: false },
            y: {
                beginAtZero: true,
                min: Math.min(...data) - 10,
                max: Math.max(...data) + 10
            }
        }
    };

    return (
        <div>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default ConsumoActual;