import React from "react";
import Row from "../Row/Row";
import classes from "./GridLine.module.css";
import GridCell from "./GridCell/GridCell";

function formatNumber(number) {
  console.log("number:" + number);
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default (props) => {
  let flds = [];

  for (let fld in props.data) {
    if (isNaN(+props.data[fld].title)) flds.push(props.data[fld]);
    else {
      props.data[fld].title = formatNumber(props.data[fld].title);
      if (props.symble !== undefined && props.data[fld].title !== "")
        props.data[fld].title += props.symble;
      flds.push(props.data[fld]);
    }

    //flds.push(props.data[fld]);
  }
  let category = flds[0];

  let onChangeName = props.onChangeName;
  if (onChangeName === undefined) {
    onChangeName = () => {};
  }
  flds.shift();

  return (
    <div className={classes.container}>
      <Row borderBottom>
        <GridCell
          tempName={props.tempName}
          onKeyDown={props.onKeyDown}
          onChange={props.onChange}
          onChangeName={onChangeName}
          onExpandCategoryHandler={props.onExpandCategoryHandler}
          onAddNewCategory={props.onAddNewCategory}
          editable={props.edit}
          header
          min={category.min}
          size={category.size}
          title={category.title}
          edit={category.edit}
          parent={category.parent}
          expand={category.expand}
          subCategory={category.subCategory}
          add_new_category={category.add}
          lineTitle={category.title}
          colIndex={0}
          id={category.id}
          rowIndex={props.rowIndex}
          onRemoveLine={props.onRemoveLine}
        ></GridCell>

        {flds.map((fld, key) => (
          <GridCell
            key={key}
            size={fld.size}
            min={fld.min}
            title={fld.title}
            edit={fld.edit}
            tempName={props.tempName}
            onKeyDown={props.onKeyDown}
            onChange={props.onChange}
            onChangeName={onChangeName}
            editable={props.edit}
            subCategory={fld.subCategory}
            lineTitle={category.title}
            colIndex={key + 1}
            id={category.id}
            rowIndex={props.rowIndex}
          ></GridCell>
        ))}
      </Row>
    </div>
  );
};
