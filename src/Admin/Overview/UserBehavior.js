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

const UserBehavior = () => {
  const [labels, setLabels] = useState([]);
  const [dataFromDataSets, setDataFromDataSets] = useState([]);

  useEffect(() => {
    axios
      .get(`http://18.223.157.202/backend/api/admin/customer_behavior`)
      .then((res) => {
        
        const flattenedActivityLogs = res.data.reduce((acc, user) => {
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
  
        
        const uniquePageNames = [...new Set(flattenedActivityLogs.map((log) => log.page_name))];
        const countsByPageName = uniquePageNames.map((page_name) => {
          const totalCount = flattenedActivityLogs.reduce((sum, log) => {
            return log.page_name === page_name ? sum + log.count : sum;
          }, 0);
          return { page_name, totalCount };
        });
  
     
        const chartLabels = countsByPageName.map((item) => item.page_name);
        const chartData = countsByPageName.map((item) => item.totalCount);
  
        setLabels(chartLabels);
        setDataFromDataSets(chartData);
      });
  }, []);

  useEffect(() => {
    // console.log(dataFromDataSets);
  }, [dataFromDataSets]);

  const data = {
    datasets: [
      {
        label: "Page Visits",
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
      <div className="bg-blue-500 p-6">
        {dataFromDataSets ? (
          data ? (
            <Bar options={options} data={data} />
          ) : (
            <p>Loading...</p> // or any loading state or placeholder you prefer
          )
        ) : null}
      </div>
      <h1 className="text-2xl mt-4 font-semibold">User Behavior</h1>
     
    </div>
  );
};

export default UserBehavior;