import React from "react";
import { Pie } from "react-chartjs-2";
import chartColor from "../utilities/constants.js";

const data = {
  labels: [],
  datasets: [
    {
      label: "Fatalities",
      data: [],
      backgroundColor: chartColor,
      borderColor: chartColor,
      borderWidth: 1
    }
  ]
};

const PieChart = (props) => {
  // data.labels = [...props?.data?.labels];
  // data.datasets[0].data = [...props?.data?.data];
  // console.log(data);
  const tempData = props.data[props.index];
  if (tempData.length !== 0) {
    data.labels = [...tempData?.labels];
    data.datasets[0].data = [...tempData?.data];
  }
  return (
    <>
      <div className="header">
        <h1 className="title">Pie Chart</h1>
      </div>
      <Pie data={data} />
    </>
  );
};

export default PieChart;
