import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { client } from "../../repositories/client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface StudentGrowthResponse {
  labels: string[];
  values: number[];
}

interface ApiResponse<T> {
  statusCode: number;
  success: boolean;
  data: T;
}

interface StudentGrowthChartProps {
  year: string;
}

const StudentGrowthChart: React.FC<StudentGrowthChartProps> = ({ year }) => {
  const [data, setData] = useState<StudentGrowthResponse>({ labels: [], values: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res: ApiResponse<StudentGrowthResponse> = await client.exec(`/students/growth?year=${year}`, { method: "get" });
        if (res.success && res.data) setData(res.data);
      } catch (err) {
        console.error(err);
        setData({ labels: [], values: [] });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [year]);

  if (loading) return <p className="text-gray-500 text-center">Loading...</p>;

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Student Growth",
        data: data.values,
        fill: true,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        tension: 0.3, // smooth line
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { position: "top" as const } },
  };

  return <Line key={year} data={chartData} options={options} />;
};

export default StudentGrowthChart;
