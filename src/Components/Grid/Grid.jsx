import React from "react";
import Col from "./Col/Col";
import GridLine from "./GridLine/GridLine";
import classes from "./Grid.module.css";
export default (props) => {
  let lines = [];
  let skip = false;

  for (let index in props.lines) {
    if (props.lines[index]["fld0"].parent !== undefined) {
      skip = false;
      if (!props.lines[index]["fld0"].expand) {
        skip = true;
        lines.push(props.lines[index]);
      }
    }
    if (!skip) {
      let subCategory = true;
      let line = { ...props.lines[index] };

      for (let fld in line) {
        if (line[fld].parent !== undefined && line[fld].parent)
          subCategory = false;
        if (subCategory) line[fld].subCategory = subCategory;
      }
      lines.push(line);
    }
  }

  return (
    <div className={classes.container}>
      <Col size={props.size}>
        <div className={classes.gridLineTitle}>
          <GridLine
            data={props.titles}
            onChangeName={props.onChangeName}
            tempName={props.tempName}
            onChange={props.onChange}
            onKeyDown={props.onKeyDown}
            {...props}
            rowIndex={0}
          ></GridLine>
        </div>
        {lines.map((line, key) => (
          <div className={classes.gridLine} key={key}>
            <GridLine
              data={line}
              onChangeName={props.onChangeName}
              tempName={props.tempName}
              onChange={props.onChange}
              onKeyDown={props.onKeyDown}
              onExpandCategory={props.onExpandCategory}
              {...props}
              onExpandCategoryHandler={props.onExpandCategoryHandler}
              onAddNewCategory={props.onAddNewCategory}
              onRemoveLine={props.onRemoveLine}
            ></GridLine>
          </div>
        ))}
      </Col>
    </div>
  );
};
