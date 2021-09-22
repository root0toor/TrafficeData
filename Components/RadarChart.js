import React from "react";
import { Radar } from "react-chartjs-2";

const data = {
  labels: [],
  datasets: [
    {
      label: "number of accidents happened ",
      data: [],
      backgroundColor: "#8c3318",
      borderColor: "#96f2cf",
      borderWidth: 1
    }
  ]
};

const options = {
  scale: {
    ticks: { beginAtZero: true, color: "#4447eb" }
  }
};

const RadarChart = (props) => {
  data.labels = [...props?.data?.labels];
  data.datasets[0].data = [...props?.data?.data];
  // console.log(data);
  return (
    <>
      <div className="header">
        <h3 className="title">Day of week accident happened</h3>
      </div>
      <Radar data={data} options={options} />
    </>
  );
};

export default RadarChart;
