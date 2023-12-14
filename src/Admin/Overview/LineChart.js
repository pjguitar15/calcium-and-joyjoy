import React, { useEffect, useState } from "react"
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
import axios from 'axios'

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
      text: "Sales",
      color: "white", // Set the color of the chart title to white
    },
  },
}

const LineChart = () => {
  const [labels, setLabels] = useState([])
  const [dataFromDataSets, setDataFromDataSets] = useState([])

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: dataFromDataSets,
        borderColor: "white",
        backgroundColor: "white",
      },
    ],
  }

  useEffect(() => {
    axios.get(`http://18.223.157.202/backend/api/admin/sales`).then((res) => {
      setLabels(res.data.data.labels)
      const modifyDataSetsData = res.data.data.datasets[0].data.map((item) => {
        return parseFloat(item.replace(/,/g, '')).toFixed(2)
      })
      setDataFromDataSets(modifyDataSetsData)
    })
  }, [])

  useEffect(() => {
    console.log(dataFromDataSets)
  }, [dataFromDataSets])

  return (
    <div className="p-5 bg-gray-100 border border-gray-400 rounded-md">
      <div className="bg-green-700 p-6">
        {dataFromDataSets ? (
          data ? (
            <Line options={options} data={data} />
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
  )
}

export default LineChart
