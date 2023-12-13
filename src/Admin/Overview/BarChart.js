import React from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement, // Use BarElement for bar charts
  Title,
  Tooltip,
  Legend
)

const options = {
  responsive: true,
  scales: {
    x: {
      type: "category", // Set x-axis type to 'category' for custom labels
      labels: ["Nike", "Jordan", "Adidas", "Converse", "Accessories"],
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
}

const data = {
  labels: ["Nike", "Jordan", "Adidas", "Converse", "Accessories"],
  datasets: [
    {
      label: "Dataset 1",
      data: [25, 40, 15, 30, 10], // Example data, replace with actual values
      borderColor: "white",
      backgroundColor: "white",
    },
  ],
}

const BarChart = () => {
  return (
    <div className="p-5 bg-gray-100 border border-gray-400 rounded-md">
      <div className="bg-yellow-500 p-6">
        <Bar options={options} data={data} />
      </div>
      <h1 className="text-2xl mt-4 font-semibold">Daily Sales</h1>
      <p>
        <span className="text-red-500 font-semibold">55% </span>Decrease in
        today sales.
      </p>
    </div>
  )
}

export default BarChart
