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


 
  
  const [labels, setLabels] = useState([]);
  const [dataFromDataSets, setDataFromDataSets] = useState([]);
  
  useEffect(() => {
      const fetchCouriersAndPaymentMethods = async () => {
          try {
              const [couriersResponse] = await Promise.all([
                  axios.get("http://18.223.157.202/backend/api/admin/sales"),
              ]);
  
              const activeCouriers = couriersResponse.data.data;
              const modifyDataSetsData = activeCouriers.datasets[0].data.map((item) => {
                  return parseFloat(item.replace(/,/g, '')).toFixed(2);
              });
  
              setLabels(activeCouriers.labels);
              setDataFromDataSets(modifyDataSetsData);
          } catch (error) {
              // Handle error
              console.error(error);
          }
      };
  
      fetchCouriersAndPaymentMethods();
  }, []); // Empty dependency array to run the effect only once
  
  useEffect(() => {
      console.log('hakdog', dataFromDataSets);
  }, [dataFromDataSets]);
  

  const data = {
    // x axis (array)
    labels,
    datasets: [
      {
        label: "Sales",
        // y axis
        data: dataFromDataSets, // (array)
        borderColor: "white",
        backgroundColor: "white",
      },
    ],
  }




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
      <h1 className="text-2xl mt-4 font-semibold">Product Sales</h1>
     
    </div>
  )
}

export default LineChart
