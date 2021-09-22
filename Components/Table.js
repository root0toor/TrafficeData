import React from "react";
import MaterialTable from "material-table";
import roadAccidentData from "../data/roadAccidentData.json";

export default function Table() {
  const [state, setState] = React.useState({
    columns: [
      { title: "Date", field: "ACCIDENT_DATE" },
      { title: "time", field: "ACCIDENT_TIME" },
      { title: "type", field: "ACCIDENT_TYPE" },
      { title: "Persons", field: "TOTAL_PERSONS" },
      { title: "Drunk", field: "ALCOHOL_RELATED" },
      { title: "Region", field: "REGION_NAME_ALL" },
      {
        title: "Police",
        field: "POLICE_ATTEND"
      }
    ],
    data: roadAccidentData
  });

  return (
    <MaterialTable
      title="Incidents List"
      columns={state.columns}
      data={state.data}
    />
  );
}
