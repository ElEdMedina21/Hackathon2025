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
                // Nueva paleta de colores vibrantes
                const colors = [
                    "#FF6384", // Rosa
                    "#36A2EB", // Azul
                    "#FFCE56", // Amarillo
                    "#4BC0C0", // Turquesa
                    "#9966FF", // Morado
                    "#FF9F40", // Naranja
                    "#E7E9ED"  // Gris claro
                ];
                return colors[index % colors.length]; // Cicla los colores si hay más datos
            }),
            borderColor: "#FFFFFF", // Blanco para contornos
            borderWidth: 2
        }]
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: "#333333" // Gris oscuro para etiquetas
                },
                grid: {
                    color: "#CCCCCC" // Gris claro para líneas de la cuadrícula
                }
            },
            x: {
                ticks: {
                    color: "#333333" // Gris oscuro para etiquetas
                },
                grid: {
                    color: "#CCCCCC" // Gris claro para líneas de la cuadrícula
                }
            }
        },
        plugins: {
            legend: {
                display: false // Oculta las leyendas
            },
            tooltip: {
                backgroundColor: "#FFFFFF", // Fondo blanco para el tooltip
                titleColor: "#000000", // Negro para el título del tooltip
                bodyColor: "#000000", // Negro para el contenido del tooltip
                borderColor: "#CCCCCC", // Borde gris claro
                borderWidth: 1
            }
        }
    };

    return (
        <div>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default ConsumoSemanal;