import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const getRandomValue = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const ForecastChart = () => {
  const [futureValues, setFutureValues] = useState([
    getRandomValue(1900, 2200),
    getRandomValue(2100, 2400),
    getRandomValue(2300, 2700),
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFutureValues([
        getRandomValue(1900, 2200),
        getRandomValue(2100, 2400),
        getRandomValue(2300, 2700),
      ]);
    }, 3000); // Se actualiza cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  const data = {
    labels: ["2022", "2023", "2024", "2025", "2026", "2027", "2030"],
    datasets: [
      {
        label: "Actual & Forecast",
        data: [3800, 1100, 2300, 1800, ...futureValues],
        borderColor: "#ffcc00",
        backgroundColor: "#ffcc00",
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      {
        label: "Forecast Zone",
        data: [null, null, null, null, futureValues[0], futureValues[1], futureValues[2]],
        backgroundColor: "rgba(128, 128, 128, 0.3)",
        fill: "start",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        grid: { color: "rgba(0,0,0,0.1)" },
      },
      y: {
        grid: { color: "rgba(0,0,0,0.1)" },
        min: 1000,
        max: 4000,
      },
    },
  };

  return (
    <div style={{ width: "600px", height: "400px", background: "#ffffff", padding: "20px", borderRadius: "10px", position: "relative" }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default ForecastChart;