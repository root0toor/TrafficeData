import React from "react";
import { Doughnut } from "react-chartjs-2";
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

const Donut = (props) => {
  // const tempData = props.data[props.index];
  // if (tempData.length !== 0) {
  //   data.labels = [...tempData?.labels];
  //   data.datasets[0].data = [...tempData?.data];
  // }

  data.labels = [...props?.data?.labels];
  data.datasets[0].data = [...props?.data?.data];
  // console.log(data, "&&&&&&&&&");
  debugger;
  return (
    <>
      <div className="header">
        <h1 className="title">Pie Chart</h1>
      </div>
      <Doughnut data={data} />
    </>
  );
};

export default Donut;
