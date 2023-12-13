import React from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const options = {
  responsive: true,
  scales: {
    x: {
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
      text: "Chart.js Line Chart",
      color: "white", // Set the color of the chart title to white
    },
  },
}

const labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

// Example: Generate some random data for each dataset
const generateRandomData = () => {
  return labels.map(() => Math.floor(Math.random() * 200) - 100)
}

const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: generateRandomData(),
      borderColor: "white",
      backgroundColor: "white",
    },
  ],
}

const LineChart = () => {
  return (
    <div className="p-5 bg-gray-100 border border-gray-400 rounded-md">
      <div className="bg-green-700 p-6">
        <Line options={options} data={data} />
      </div>
      <h1 className="text-2xl mt-4 font-semibold">Daily Sales</h1>
      <p>
        <span className="text-red-500 font-semibold">55% </span>Decrease in
        today sales.
      </p>
    </div>
  )
}

export default LineChart
