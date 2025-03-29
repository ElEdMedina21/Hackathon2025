import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const GraficaPastel = () => {
    const [labels, setLabels] = useState([]);
    const [values, setValues] = useState([]);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get("https://nxnsmxw7-8000.usw3.devtunnels.ms/pie_article_consume/");
            console.log("API Response:", response.data);

            const dispositivos = response.data;
            const nombres = dispositivos.map((item) => item.nombre);
            const consumos = dispositivos.map((item) => item.consumo_actual);

            setLabels(nombres);
            setValues(consumos);
            setError(null); // Clear any previous errors
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Failed to fetch data. Please try again later.");
        }
    }, []);

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 1000); // Actualiza cada 5 segundos

        return () => clearInterval(interval);
    }, [fetchData]);

    const chartData = useMemo(() => ({
        labels,
        datasets: [
            {
                label: "Consumo de Energía (kWh)",
                data: values,
                backgroundColor: [
                    "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF",
                    "#FF9F40", "#E7E9ED", "#FF6384", "#36A2EB", "#FFCE56"
                ],
                borderColor: "#fff",
                borderWidth: 1,
            },
        ],
    }), [labels, values]);

    const options = useMemo(() => ({
        responsive: true,
        plugins: {
            legend: {
                display: true, // Muestra la leyenda para mayor claridad
                position: "bottom",
            },
            tooltip: {
                backgroundColor: "#FFFFFF",
                titleColor: "#000000",
                bodyColor: "#000000",
                borderColor: "#CCCCCC",
                borderWidth: 1,
            },
        },
    }), []);

    return (
        <div className="flex justify-center items-center p-4">
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div className="w-96 h-96">
                <Doughnut data={chartData} options={options} />
            </div>
        </div>
    );
};

export default GraficaPastel;