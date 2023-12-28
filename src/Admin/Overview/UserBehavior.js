import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
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

const options = {
  responsive: true,
  scales: {
    x: {
      type: "category",
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
      text: "User Behavior",
      color: "white",
    },
  },
};

const UserBehavior = () => {
  const [chartData, setChartData] = useState({ labels: [], data: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://18.223.157.202/backend/api/admin/customer_behavior`)
      .then((res) => {
        const activityLogs = res.data.reduce((acc, user) => {
          user.activity_logs.forEach((log) => {
            const existingLog = acc.find((item) => item.page_name === log.page_name);
            if (existingLog) {
              existingLog.count += log.count;
            } else {
              acc.push({ page_name: log.page_name, count: log.count });
            }
          });
          return acc;
        }, []);

        const labels = activityLogs.map((log) => log.page_name);
        const data = activityLogs.map((log) => log.count);

        setChartData({ labels, data });
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
        <Bar options={options} data={data} />
      </div>
      <h1 className="text-2xl mt-4 font-semibold">User Behavior</h1>
    </div>
  );
};

export default UserBehavior;
