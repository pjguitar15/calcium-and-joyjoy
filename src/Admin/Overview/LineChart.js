import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  scales: {
    x: {
      ticks: { color: "white" },
    },
    y: {
      ticks: { color: "white" },
    },
  },
  plugins: {
    legend: {
      position: "top",
      labels: { color: "white" },
    },
    title: {
      display: true,
      text: "Sales",
      color: "white",
    },
  },
};

const LineChart = () => {
  const [chartData, setChartData] = useState({ labels: [], data: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://18.223.157.202/backend/api/admin/sales")
      .then((response) => {
        const activeCouriers = response.data.data;
        const modifiedData = activeCouriers.datasets[0].data.map(item =>
          parseFloat(item.replace(/,/g, '')).toFixed(2)
        );

        setChartData({
          labels: activeCouriers.labels,
          data: modifiedData,
        });
      })
      .catch(error => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading data</p>;
  }

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Sales",
        data: chartData.data,
        borderColor: "white",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
      },
    ],
  };

  return (
    <div className="p-5 bg-gray-100 border border-gray-400 rounded-md">
      <div className="bg-green-700 p-6">
        <Line options={options} data={data} />
      </div>
      <h1 className="text-2xl mt-4 font-semibold">Product Sales</h1>
    </div>
  );
};

export default LineChart;
