import React from "react";
import Chart from "react-apexcharts";

export default (props) => {
  let style = {
    boxShadow: "0 2px 3px #64636380",
    borderBottomLeftRadius: "5px",
    borderBottomRightRadius: "5px",
    marginBottom: "1rem",
  };
  return (
    <div style={style}>
      <h4>{props.data.title}</h4>
      <Chart
        options={props.data.options}
        series={props.data.series}
        type={props.data.type}
        width={props.data.width}
        xaxis={props.data.xaxis}
      />
    </div>
  );
};
