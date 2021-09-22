import React from "react";
import { Line } from "react-chartjs-2";

const data = {
  labels: ["1", "2", "3", "4", "5", "6"],
  datasets: [
    {
      label: "Number of incidents occured",
      data: [],
      fill: false,
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgba(255, 99, 132, 0.2)"
    }
  ]
};

const options = {
  scales: {
    x: {
      grid: {
        display: false
      },
      ticks: {
        beginAtZero: true,
        color: "#4a2919"
      },
      title: {}
    },
    y: {
      grid: { display: false },
      ticks: {
        beginAtZero: true,
        color: "#4a2919"
      },
      title: {}
    }
  }
};

const LineChart = (props) => {
  data.labels = [...props?.data?.labels];
  data.datasets[0].data = [...props?.data?.data];
  return (
    <>
      <div className="header">
        <h1 className="title">Line Chart</h1>
      </div>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
