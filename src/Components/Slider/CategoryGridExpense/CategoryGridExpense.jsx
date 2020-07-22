import React from "react";
import GridLine from "./GridExpenseLine/GridExpenseLine";
import classes from "./CategoryGridExpense.module.css";
export default (props) => {
  let category = JSON.parse(JSON.stringify(props.category));
  if (!props.load) category = [];

  let color = "black";
  let exp_line_color = "#053a4b";

  let fontSize = "1.1rem";
  let labelSize = "1.2rem";
  if (window.innerWidth < 500) {
    fontSize = "1rem";
    labelSize = "1rem";
  }
  return (
    <div>
      <div className={classes.container}>
        <div className={classes.title}>
          <label>Categories</label>
        </div>
        {category.map((line, key) => (
          <div key={key}>
            <GridLine
              exp={line}
              exp_line_color={exp_line_color}
              fontSize={fontSize}
              color={color}
              labelSize={labelSize}
            ></GridLine>
          </div>
        ))}
      </div>
    </div>
  );
};
