import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ConsumoSemanal = () => {
    const [labels, setLabels] = useState([]);
    const [values, setValues] = useState([]);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get("https://nxnsmxw7-8000.usw3.devtunnels.ms/week_article_consume/");
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
                label: "Consumo de Energía (kW)",
                data: values,
                backgroundColor: values.map((_, index) => {
                    const colors = [
                        "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#E7E9ED"
                    ];
                    return colors[index % colors.length];
                }),
                borderColor: "#FFFFFF",
                borderWidth: 2,
            },
        ],
    }), [labels, values]);

    const options = useMemo(() => ({
        responsive: true,
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
        plugins: {
            legend: { display: false },
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
        <div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default ConsumoSemanal;