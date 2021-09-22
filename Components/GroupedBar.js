import React, { useState } from "react";
import { Bar } from "react-chartjs-2";

const data = {
  // labels: ["1", "2", "3", "4", "5", "6"],
  datasets: []
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true
        }
      }
    ]
  }
};

const GroupedBar = (props) => {
  options.onClick = props?.clickEvent;
  const [clickedDataset, setClickedDataset] = useState("");
  const getDatasetAtEvent = (dataset) => {
    // console.log("%%%%%%%%%%%%%", dataset);
    if (!dataset.length) return;

    const datasetIndex = dataset[0].datasetIndex;
    setClickedDataset(data.datasets[datasetIndex].label);
  };
  data.labels = props?.data?.labels;
  data.datasets = props?.data?.data;
  return (
    <>
      <div className="header">
        <h1 className="title">Grouped Bar Chart</h1>
        <div className="links"></div>
      </div>
      <Bar
        data={data}
        options={options}
        getDatasetAtEvent={getDatasetAtEvent}
      />
    </>
  );
};

export default GroupedBar;
