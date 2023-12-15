import React, { useEffect, useState } from "react";
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
import { Bar } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement, // Use BarElement for bar charts
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const [labels, setLabels] = useState([]);
  const [dataFromDataSets, setDataFromDataSets] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://18.223.157.202/backend/api/admin/get_most_sold_products_chart`
      )
      .then((res) => {
        // console.log(res.data.chart_config.data.labels);
        // console.log(res.data.chart_config.data.datasets);
        setLabels(res.data.chart_config.data.labels);
        const modifyDataSetsData = res.data.chart_config.data.datasets[0].data;
        setDataFromDataSets(modifyDataSetsData);
      });
  }, []);

  useEffect(() => {
    // console.log(dataFromDataSets);
  }, [dataFromDataSets]);

  const data = {
    datasets: [
      {
        label: "Dataset 1",
        data: dataFromDataSets,
        borderColor: "white",
        backgroundColor: "white",
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: "category", // Set x-axis type to 'category' for custom labels
        labels,
        ticks: {
          color: "white", // Set the color of x-axis labels to white
        },
      },
      y: {
        ticks: {
          color: "white", // Set the color of y-axis labels to white
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "white", // Set the color of legend labels to white
        },
      },
      title: {
        display: true,
        text: "Sales by Category", // Change title for the bar chart
        color: "white", // Set the color of the chart title to white
      },
    },
  };

  return (
    <div className="p-5 bg-gray-100 border border-gray-400 rounded-md">
      <div className="bg-yellow-500 p-6">
        {dataFromDataSets ? (
          data ? (
            <Bar options={options} data={data} />
          ) : (
            <p>Loading...</p> // or any loading state or placeholder you prefer
          )
        ) : null}
      </div>
      <h1 className="text-2xl mt-4 font-semibold">Daily Sales</h1>
      <p>
        <span className="text-red-500 font-semibold">55% </span>Decrease in
        today sales.
      </p>
    </div>
  );
};

export default BarChart;