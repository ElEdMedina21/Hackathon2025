import React, { useState, useEffect, useRef } from "react";
import Chart from "react-apexcharts";

const ConsumoActual = () => {
  const XAXISRANGE = 10000;
  const API_URL = "https://nxnsmxw7-8000.usw3.devtunnels.ms/article_consume/";
  const dataRef = useRef([]);
  const [data, setData] = useState([]);
  const [yMin, setYMin] = useState(0);
  const [yMax, setYMax] = useState(100);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const result = await response.json();
        const newDate = new Date().getTime();
        const newPoint = { x: newDate, y: result.data[0] };

        dataRef.current.push(newPoint);
        while (
          dataRef.current.length > 0 &&
          newDate - dataRef.current[0].x > XAXISRANGE
        ) {
          dataRef.current.shift();
        }

        setData([...dataRef.current]);

        const values = dataRef.current.map((point) => point.y);
        setYMin(Math.min(...values) - 5);
        setYMax(Math.max(...values) + 5);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  const options = {
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
    series: [{ data }],
  };

  return (
    <div>
      <Chart options={options} series={options.series} type="line" />
    </div>
  );
};

export default ConsumoActual;