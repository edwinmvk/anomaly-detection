import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DataStreamGraph = ({ datastream, anomaly }) => {
  const timeSeries = datastream.map((_, index) => index); // X-axis as time (indices of the data points)

  const data = {
    labels: timeSeries, // X-axis labels (time)
    datasets: [
      {
        label: "Data Stream",
        data: datastream, // Y-axis values
        borderColor: "blue", // Line color
        pointRadius: datastream.map((_, index) =>
          anomaly.includes(index) ? 5 : 2
        ), // Larger points for anomalies based on index
        pointBackgroundColor: datastream.map((_, index) =>
          anomaly.includes(index) ? "red" : "blue"
        ), // Red dots for anomalies at specific indices
        fill: false,
        tension: 0.1, // Smooth line
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Value: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time",
        },
      },
      y: {
        title: {
          display: true,
          text: "Value",
        },
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default DataStreamGraph;
