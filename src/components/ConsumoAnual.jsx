import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ConsumoAnual = () => {
    const [labels, setLabels] = useState([]);
    const [values, setValues] = useState([]);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get("http://34.234.96.17/yearly_article_consume/");
            console.log("API Response:", response.data);

            const dataObject = response.data.data;
            setLabels(Object.keys(dataObject));
            setValues(Object.values(dataObject));
            setError(null); // Clear any previous errors
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Failed to fetch data. Please try again later.");
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const chartData = useMemo(() => ({
        labels,
        datasets: [
            {
                label: "Consumo de Energía por Año (kWh)",
                data: values,
                backgroundColor: [
                    "#FF6384", // Rojo
                    "#36A2EB", // Azul
                    "#FFCE56", // Amarillo
                    "#4BC0C0", // Verde
                    "#9966FF", // Morado
                ],
                borderColor: "#FFFFFF", // Blanco para bordes
                borderWidth: 1,
            },
        ],
    }), [labels, values]);

    const options = useMemo(() => ({
        responsive: true,
        plugins: {
            legend: {
                display: false, // Oculta las leyendas
            },
            tooltip: {
                backgroundColor: "#FFFFFF",
                titleColor: "#000000",
                bodyColor: "#000000",
                borderColor: "#CCCCCC",
                borderWidth: 1,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: { color: "#333333" },
                grid: { color: "#CCCCCC" },
            },
            x: {
                ticks: { color: "#333333" },
                grid: { color: "#CCCCCC" },
            },
        },
    }), []);

    return (
        <div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default ConsumoAnual;