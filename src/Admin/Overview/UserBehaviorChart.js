import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axiosInstance from "../../Shared/utils/axiosInstance";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const truncateLabel = (label, maxLength = 15) => {
  return label.length > maxLength ? label.substring(0, maxLength) + '...' : label;
};

const chartOptions = {
  responsive: true,
  scales: {
    x: {
      type: "category",
      ticks: { color: "white", autoSkip: true, maxRotation: 0, minRotation: 0 },
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
      text: "User Behavior",
      color: "white",
    },
  },
};

const UserBehaviorReport = () => {
  const [chartData, setChartData] = useState({ labels: [], data: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance.get("/shoes")
      .then((response) => {
        const productViewsData = response.data.map(product => ({
          name: truncateLabel(product.name),
          views: product.product_view,
        })).sort((a, b) => b.views - a.views)
          .slice(0, 10);

        setChartData({
          labels: productViewsData.map(p => p.name),
          data: productViewsData.map(p => p.views),
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
    return <p>Error loading data: {error.message}</p>;
  }

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Page Visits",
        data: chartData.data,
        borderColor: "white",
        backgroundColor: "white",
      },
    ],
  };

  return (
    <div className="p-5 bg-gray-100 border border-gray-400 rounded-md">
      <div className="bg-blue-500 p-6">
        <Bar options={chartOptions} data={data} />
      </div>
      <h1 className="text-2xl mt-4 font-semibold">User Behavior</h1>
    </div>
  );
};

export default UserBehaviorReport;
