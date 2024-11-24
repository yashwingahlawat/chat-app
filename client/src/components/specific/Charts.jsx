import React from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  Tooltip,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
} from "chart.js";
import { getLast7Days } from "../../lib/features";

ChartJS.register(
  CategoryScale,
  Tooltip,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend
);

const LineChartoptions = {
  responsive: true,
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: "white", // Set the color of x-axis labels to white
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: false,
      },
      ticks: {
        color: "white", // Set the color of y-axis labels to white
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

const LineChart = ({ value = [] }) => {
  const labels = getLast7Days();
  const data = {
    labels,
    datasets: [
      {
        data: value,
        fill: true,
        label: "Messages",
        backgroundColor: "rgba(78, 76, 184, 0.5)",
        borderColor: "white",
      },
    ],
    borderColor: "white",
  };

  return <Line className="z-10" data={data} options={LineChartoptions} />;
};

const DougnutChartoptions = {
  responsive: true,
  cutout: 120,
  plugins: {
    legend: {
      display: false,
    },
  },
};

const DougnutChart = ({ value, labels = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        offset: 15,
        data: value,
        label: "Total Chats vs Group Chats",
        backgroundColor: ["white", "gray"],
        borderColor: ["white", "gray"],
      },
    ],
  };

  return (
    <Doughnut className="z-10" data={data} options={DougnutChartoptions} />
  );
};

export { LineChart, DougnutChart };
