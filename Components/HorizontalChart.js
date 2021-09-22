import React from "react";
import { Bar } from "react-chartjs-2";
import chartColor from "../utilities/constants.js";

const data = {
  labels: [],
  datasets: [
    {
      label: "involved in the accident",
      data: [],
      backgroundColor: "#96f2cf",
      borderColor: "#96f2cf",
      borderWidth: 1
    }
  ]
};

const options = {
  indexAxis: "y",
  // Elements options apply to all of the options unless overridden in a dataset
  // In this case, we are setting the border of each horizontal bar to be 2px wide
  elements: {
    bar: {
      borderWidth: 2
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      },
      ticks: {
        color: "#4447eb"
      },
      title: {}
    },
    y: {
      grid: {},
      ticks: {
        color: "#4447eb"
      },
      title: {}
    }
  },
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: "right"
    },
    tooltip: {
      xAlign: "center",
      yAlign: "bottom",
      displayColors: false,
      titleAlign: "top",
      bodyAlign: "top"
    },
    title: {
      display: false,
      text: "Chart.js Horizontal Bar Chart"
    }
  }
};

const HorizontalBarChart = (props) => {
  data.labels = [...props?.data?.labels];
  data.datasets[0].data = [...props?.data?.data];
  // console.log(data);
  return (
    <>
      <div className="header">
        <h3 className="title">Persons involved in accident</h3>
      </div>
      <Bar data={data} options={options} />
    </>
  );
};

export default HorizontalBarChart;
