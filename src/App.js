import "./styles.css";
import "mapbox-gl/dist/mapbox-gl.css";
import roadAccidentData from "../data/roadAccidentData.json";
import GroupedBar from "../Components/GroupedBar.js";
import PieChart from "../Components/PieChart.js";
import DonutChart from "../Components/DonutChart.js";
import RadarChart from "../Components/RadarChart.js";
import chartColor from "../utilities/constants.js";
import LineChart from "../Components/LineChart.js";
import Table from "../Components/Table.js";
import Map from "../Components/Map.js";
import HorizontalChart from "../Components/HorizontalChart.js";
import MultiChart from "../Components/Multi_chart.js";
import { useEffect, useState } from "react";

export default function App() {
  // console.log(roadAccidentData.length);
  const [index, setIndex] = useState(0);
  const [donutDataForBar, setDonutDataForBar] = useState([]);
  let colorSelectedIndex = 0;
  const getYear = (dateinStr) => {
    return dateinStr.split("/")[2];
  };
  const getMonth = (dateinStr) => {
    return dateinStr.split("/")[0];
  };
  const yearWiseDataSegregationFunction = (data) => {
    let returnObect = {};
    for (let i in data) {
      if (data[i].ACCIDENT_DATE) {
        const year = getYear(data[i].ACCIDENT_DATE);
        if (!returnObect[year]) {
          returnObect[year] = {
            SERIOUSINJURY: 0,
            TOTAL_PERSONS: 0,
            NO_OF_VEHICLES: 0
          };
        }
        returnObect[year]["SERIOUSINJURY"] += data[i]?.SERIOUSINJURY;
        returnObect[year]["TOTAL_PERSONS"] += data[i]?.TOTAL_PERSONS;
        returnObect[year]["NO_OF_VEHICLES"] += data[i]?.NO_OF_VEHICLES;
      }
    }
    let yearData = {
      labels: Object.keys(returnObect),
      data: [
        {
          label: "Serious Injury YoY change",
          data: [0],
          backgroundColor: "rgb(255, 99, 132)"
        },
        {
          label: "Persons Involved YoY change",
          data: [0],
          backgroundColor: "rgb(54, 162, 235)"
        },
        {
          label: "Vehicles Involved YoY change",
          data: [0],
          backgroundColor: "rgb(75, 192, 192)"
        }
      ]
    };
    for (let i = 1; i < yearData.labels.length; i++) {
      const seriousInjuryChangeRate =
        (100 *
          (returnObect[yearData.labels[i]]["SERIOUSINJURY"] -
            returnObect[yearData.labels[i - 1]]["SERIOUSINJURY"])) /
        returnObect[yearData.labels[i]]["SERIOUSINJURY"];
      yearData.data[0].data.push(seriousInjuryChangeRate);
      const personInvolvedChangeRate =
        (100 *
          (returnObect[yearData.labels[i]]["TOTAL_PERSONS"] -
            returnObect[yearData.labels[i - 1]]["TOTAL_PERSONS"])) /
        returnObect[yearData.labels[i]]["TOTAL_PERSONS"];
      yearData.data[1].data.push(personInvolvedChangeRate);
      const vehiclesInvolvedChangeRate =
        (100 *
          (returnObect[yearData.labels[i]]["NO_OF_VEHICLES"] -
            returnObect[yearData.labels[i - 1]]["NO_OF_VEHICLES"])) /
        returnObect[yearData.labels[i]]["NO_OF_VEHICLES"];
      yearData.data[2].data.push(vehiclesInvolvedChangeRate);
    }
    console.log(yearData);
    return yearData;
  };
  // code from here
  function getChartsDataNew(data) {
    const MultiData = {
      labels: [],
      data: []
    };

    for (let i in roadAccidentData) {
      if (roadAccidentData[i].ACCIDENT_DATE) {
        let date = roadAccidentData[i].ACCIDENT_DATE;
        let year = getYear(date);
        let month = getMonth(date);
        if (year === "2014") {
          if (month === "7") {
            //new code
            if (roadAccidentData[i].SEVERITY === "FATALITY") {
              if (!MultiChart.labels.includes(month)) {
                // debugger;
                MultiChart.labels.push(month);
                MultiChart.data.push(0);
              }
              const getMonthIndex = MultiData.labels.indexOf(month);

              if (getMonthIndex !== -1) {
                MultiData.data[getMonthIndex] =
                  MultiData.data[getMonthIndex] + 1;
              }
            }
            // console.log(getMonth(date), date, getYear(date));
          }
        }
      }
    }
  }

  useEffect(() => {
    setDonutDataForBar(donutDataBarLinked[index]);
  }, [index]);
  const onClickBar = (evt, element) => {
    // console.log(element[0]?.index, "*******************");
    setIndex(element[0]?.index || 0);
    // if (element.length > 0) {
    //   console.log(element, element[0]._datasetInde);
    //   // you can also get dataset of your selected element
    //   console.log(data.datasets[element[0]._datasetIndex]);
    // }
  };
  function getChartsData(data) {
    const pieData = {
      labels: ["MALES", "FEMALES", "UNKNOWN"],
      data: [0, 0, 0]
    };
    const lineData = {
      labels: [],
      data: []
    };
    const donutDataBarLinked = [];
    const donutBarLabels = [];
    const donutSkeletonObject = {
      labels: [],
      data: []
    };
    const groupedData = {
      labels: [
        "BICYCLIST",
        "PASSENGER",
        "DRIVER",
        "PEDESTRIAN",
        "PILLION",
        "MOTORIST",
        "UNKNOWN"
      ],
      data: [],
      year: []
    };
    const HorizontalData = {
      labels: [
        "BICYCLIST",
        "DRIVER",
        "MOTORIST",
        "PASSENGER",
        "PEDESTRIAN",
        "UNKNOWN"
      ],
      data: [0, 0, 0, 0, 0, 0]
    };
    const RadarData = {
      labels: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      data: [0, 0, 0, 0, 0, 0, 0]
    };
    for (let i in data) {
      if (data[i].ACCIDENT_DATE) {
        const year = getYear(data[i].ACCIDENT_DATE);
        // console.log(year, data[i].ACCIDENT_DATE);
        if (data[i].TOTAL_PERSONS) {
          if (!lineData.labels.includes(year)) {
            // debugger;
            lineData.labels.push(year);
            lineData.data.push(0);
          }
          const getYearIndex = lineData.labels.indexOf(year);
          if (getYearIndex !== -1) {
            lineData.data[getYearIndex] += data[i].TOTAL_PERSONS;
          }
        }
        for (let j in groupedData.labels) {
          if (data[i][groupedData.labels[j]]) {
            if (!groupedData.year.includes(year)) {
              groupedData.year.push(year);
              groupedData.data.push({
                label: year,
                data: [0, 0, 0, 0, 0, 0, 0],
                backgroundColor: chartColor[colorSelectedIndex++]
              });
            }
            let yearIndex = groupedData.year.indexOf(year);
            let labelsIndex = groupedData.labels.indexOf(groupedData.labels[j]);
            groupedData.data[yearIndex].data[labelsIndex] +=
              data[i][groupedData.labels[j]];
            if (data[i].SEVERITY) {
              if (!donutBarLabels.includes(groupedData.labels[j])) {
                donutDataBarLinked.push({
                  data: [],
                  labels: []
                });
                donutBarLabels.push(groupedData.labels[j]);
              }
              const donutIndex = donutBarLabels.indexOf(groupedData.labels[j]);
              if (donutIndex === 1) {
                continue;
              }
              if (
                !donutDataBarLinked[donutIndex]?.labels.includes(
                  data[i].SEVERITY
                )
              ) {
                donutDataBarLinked[donutIndex]?.labels.push(data[i].SEVERITY);
                donutDataBarLinked[donutIndex]?.data.push(0);
              }
              let severityIndex = donutDataBarLinked[donutIndex].labels.indexOf(
                data[i].SEVERITY
              );
              donutDataBarLinked[donutIndex].data[severityIndex] += 1;
            }
          }
        }
      }
      if (data[i].MALES) {
        pieData.data[0] += data[i].MALES;
      }
      if (data[i].FEMALES) {
        pieData.data[1] += data[i].FEMALES;
      }
      if (data[i].UNKNOWN) {
        pieData.data[2] += data[i].UNKNOWN;
      }
      //for horizontal chart
      if (data[i].BICYCLIST) {
        HorizontalData.data[0] += data[i].BICYCLIST;
      }
      if (data[i].DRIVER) {
        HorizontalData.data[1] += data[i].DRIVER;
      }
      if (data[i].MOTORIST) {
        HorizontalData.data[2] += data[i].MOTORIST;
      }
      if (data[i].PASSENGER) {
        HorizontalData.data[3] += data[i].PASSENGER;
      }
      if (data[i].PEDESTRIAN) {
        HorizontalData.data[4] += data[i].PEDESTRIAN;
      }
      if (data[i].UNKNOWN) {
        HorizontalData.data[5] += data[i].UNKNOWN;
      }
      // for radar chart
      if (data[i].DAY_OF_WEEK === "Monday") {
        RadarData.data[0] = RadarData.data[0] + 1;
      }
      if (data[i].DAY_OF_WEEK === "Tuesday") {
        RadarData.data[1] = RadarData.data[1] + 1;
      }
      if (data[i].DAY_OF_WEEK === "Wednesday") {
        RadarData.data[2] = RadarData.data[2] + 1;
      }
      if (data[i].DAY_OF_WEEK === "Thursday") {
        RadarData.data[3] = RadarData.data[3] + 1;
      }
      if (data[i].DAY_OF_WEEK === "Friday") {
        RadarData.data[4] = RadarData.data[4] + 1;
      }
      if (data[i].DAY_OF_WEEK === "Saturday") {
        RadarData.data[5] = RadarData.data[5] + 1;
      }
      if (data[i].DAY_OF_WEEK === "Sunday") {
        RadarData.data[6] = RadarData.data[6] + 1;
      }
    }

    // console.log(groupedData);

    // setDonutDataForBar(donutDataBarLinked[0]);
    return {
      lineData,
      pieData,
      groupedData,
      HorizontalData,
      RadarData,
      donutDataBarLinked
    };
  }
  const {
    lineData,
    pieData,
    groupedData,
    HorizontalData,
    RadarData,
    donutDataBarLinked
  } = getChartsData(roadAccidentData);
  const yearWiseData = yearWiseDataSegregationFunction(roadAccidentData);
  console.log(yearWiseData, "*************");
  return (
    <div className="App">
      <div className="acci_head">
        <h1>Road Accident Statistics in Victoria from 2014 to 2019</h1>
        <h2 class="subheading">
          Statistics, main-causes & precautions for road accidents{" "}
        </h2>
      </div>
      <div className="row m-20">
        <div className="col" style={{ width: "50%" }}>
          <LineChart data={lineData} />
        </div>
        <div className="col" style={{ width: "25%" }}>
          <DonutChart data={pieData} />
        </div>
      </div>
      <div className="row m-20">
        <div className="col" style={{ width: "50%" }}>
          <GroupedBar
            data={groupedData}
            clickEvent={onClickBar}
            donutDataBarLinked={donutDataBarLinked}
          />
        </div>
        <div className="col" style={{ width: "25%" }}>
          <PieChart data={donutDataBarLinked} index={index} />
        </div>
      </div>
      <div className="row m-20">
        <div className="col" style={{ width: "50%" }}>
          <GroupedBar
            data={yearWiseData}
            clickEvent={onClickBar}
            donutDataBarLinked={donutDataBarLinked}
          />
        </div>
      </div>
      <div className="m-20">
        <div>
          <Table />
        </div>
      </div>
      <div className="row m-20">
        <div className="col Horizon" style={{ width: "40%" }}>
          <HorizontalChart data={HorizontalData} />
        </div>
        {/* <h2> Day of accident </h2> */}
        <div className="Radar col" style={{ width: "40%" }}>
          <RadarChart data={RadarData} />
        </div>
      </div>
      <div className="container m-20">
        <Map />
      </div>
    </div>
  );
}
