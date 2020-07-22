import React from "react";
import Chart from "react-apexcharts";

export default (props) => {
  return (
    <div>
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
