import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { client } from "../../repositories/client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ProgramsResponse {
  labels: string[];
  art: number[];
  tech: number[];
  children: number[];
}

interface ApiResponse<T> {
  statusCode: number;
  success: boolean;
  data: T;
}

interface ProgramsOverviewChartProps {
  year: string;
  month: string;
}

const ProgramsOverviewChart: React.FC<ProgramsOverviewChartProps> = ({ year, month }) => {
  const [data, setData] = useState<ProgramsResponse>({
    labels: [],
    art: [],
    tech: [],
    children: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        console.log("ij")
        const url = month === "All"
          ? `/students/overview?year=${year}`
          : `/students/overview?year=${year}&month=${month}`;
        const res: ApiResponse<ProgramsResponse> = await client.exec(url, { method: "get" });
        if (res.success && res.data) setData(res.data);
        console.log(res);
      } catch (err) {
        console.error(err);
        setData({ labels: [], art: [], tech: [], children: [] });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [year, month]);

  if (loading) return <p className="text-gray-500 text-center">Loading...</p>;

  const chartData = {
    labels: data.labels,
    datasets: [
      { label: "Art & Design Programs", data: data.art, backgroundColor: "rgba(255, 99, 132, 0.8)" },
      { label: "Technology Programs", data: data.tech, backgroundColor: "rgba(54, 162, 235, 0.8)" },
      { label: "Children's Creative Programs", data: data.children, backgroundColor: "rgba(255, 206, 86, 0.8)" },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { position: "top" as const } },
  };

  return <Bar key={`${year}-${month}`} data={chartData} options={options} />;
};

export default ProgramsOverviewChart;
