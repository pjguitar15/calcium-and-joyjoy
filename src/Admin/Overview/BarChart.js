import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axiosInstance from "../../Shared/utils/axiosInstance";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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
      text: "Top 10 Most Sold Products",
      color: "white",
    },
  },
};

// Function to truncate label text
const truncateLabel = (label, maxLength = 15) => {
  return label.length > maxLength ? label.substring(0, maxLength) + '...' : label;
};

const BarChart = () => {
  const [chartData, setChartData] = useState({ labels: [], data: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance.get("/admin/get_most_sold_products_chart")
      .then((res) => {
        const { labels, datasets } = res.data.chart_config.data;
  
        // Sort and slice top 10 products
        const sortedData = [...datasets[0].data]
          .map((value, index) => ({ label: labels[index], value }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 10);
  
        // Apply label truncation
        const truncatedLabels = sortedData.map(item => truncateLabel(item.label));
  
        setChartData({
          labels: truncatedLabels,
          data: sortedData.map(item => item.value),
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
        label: "Total Order",
        data: chartData.data,
        borderColor: "white",
        backgroundColor: "white",
      },
    ],
  };

  return (
    <div className="p-5 bg-gray-100 border border-gray-400 rounded-md">
      <div className="bg-yellow-500 p-6">
        <Bar options={chartOptions} data={data} />
      </div>
      <h1 className="text-2xl mt-4 font-semibold">Top 10 Most Sold Products</h1>
    </div>
  );
};

export default BarChart;
