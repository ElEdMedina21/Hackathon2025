import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ConsumoSemanal = () => {
    const [labels, setLabels] = useState([]);
    const [values, setValues] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://nxnsmxw7-8000.usw3.devtunnels.ms/week_article_consume/");
                console.log("API Response:", response.data);

                const dataObject = response.data.data;
                const dias = Object.keys(dataObject);
                const consumos = Object.values(dataObject);
                
                setLabels(dias);
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
            label: "Consumo de Energía (kW)",
            data: values,
            backgroundColor: values.map((value, index) => {
                const colors = [
                    "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#E7E9ED"
                ];
                return colors[index % colors.length];
            }),
            borderColor: "#FFFFFF",
            borderWidth: 2
        }]
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                ticks: { color: "#333333" },
                grid: { color: "#CCCCCC" }
            },
            x: {
                ticks: { color: "#333333" },
                grid: { color: "#CCCCCC" }
            }
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: "#FFFFFF",
                titleColor: "#000000",
                bodyColor: "#000000",
                borderColor: "#CCCCCC",
                borderWidth: 1
            }
        }
    };

    return (
        <div className="flex justify-center items-center p-4">
            <div className="w-full max-w-md h-80 bg-white shadow-md rounded-lg p-4">
                <Bar data={chartData} options={options} />
            </div>
        </div>
    );
};

export default ConsumoSemanal;