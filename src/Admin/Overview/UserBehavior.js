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

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Shoe Product Views",
    },
  },
};

const UserBehaviorReport = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/shoes");
        const productViewsData = response.data.map(product => ({
          name: product.name.length > 10 ? product.name.substring(0, 10) + '...' : product.name,
          views: product.product_view,
        })).sort((a, b) => b.views - a.views) // Sort by views
          .slice(0, 10); // Limit to 10 products
  
        const labels = productViewsData.map(p => p.name);
        const data = productViewsData.map(p => p.views);
  
        setChartData({
          labels,
          datasets: [
            {
              label: 'Product Views',
              data,
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
          ],
        });
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchProducts();
  }, []);
  
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading data: {error.message}</p>;
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
      <h2>User Behavior Report: Shoe Product Views</h2>
      <Bar options={options} data={chartData} />
    </div>
  );
};

export default UserBehaviorReport;
