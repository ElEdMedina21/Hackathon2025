import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Chart from "react-apexcharts";

const ConsumoActual = () => {
  const XAXISRANGE = 20000;
  const API_URL = "https://nxnsmxw7-8000.usw3.devtunnels.ms/article_consume/";
  const dataRef = useRef([]);
  const [data, setData] = useState([]);
  const [yMin, setYMin] = useState(0);
  const [yMax, setYMax] = useState(100);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      const newDate = new Date().getTime();
      const newPoint = { x: newDate, y: result.data[0] };

      const updatedData = [...dataRef.current, newPoint].filter(
        (point) => newDate - point.x <= XAXISRANGE
      );

      dataRef.current = updatedData;
      setData(updatedData);

      const values = updatedData.map((point) => point.y);
      setYMin(Math.min(...values) - 5);
      setYMax(Math.max(...values) + 5);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again later.");
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const options = useMemo(
    () => ({
      chart: {
        id: "realtime",
        height: 350,
        type: "line",
        animations: {
          enabled: false,
        },
        toolbar: { show: false },
        zoom: { enabled: false },
        redrawOnParentResize: false,
      },
      dataLabels: { enabled: false },
      stroke: { curve: "smooth" },
      title: { text: "Dynamic Updating Chart", align: "left" },
      markers: { size: 0 },
      xaxis: {
        type: "datetime",
        range: XAXISRANGE,
        tickAmount: 6,
      },
      yaxis: {
        min: yMin,
        max: yMax,
      },
      legend: {
        show: false,
      },
    }),
    [yMin, yMax]
  );

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Chart options={options} series={[{ data }]} type="line" />
    </div>
  );
};

export default ConsumoActual;