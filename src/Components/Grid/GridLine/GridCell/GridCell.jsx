import React from "react";
import Col from "../../Col/Col";
import arrowDown from "../../../../img/arrow_drop_down-24px.svg";
import arrowRight from "../../../../img/arrow_right-24px.svg";
import edit from "../../../../img/create-24px.svg";
import add from "../../../../img/control_point-24px.svg";
import remove from "../../../../img/remove_circle_outline-24px.svg";
import GridMessageBox from "./GridMessageBox/GridMessageBox";
import classes from "./GridCell.module.css";
export default (props) => {
  let messageBox = "";

  let index = props.id + "|" + props.colIndex;

  if (props.edit) {
    messageBox = (
      <GridMessageBox
        title={props.title}
        onKeyDown={props.onKeyDown}
        onChange={props.onChange}
        onClick={props.onChangeName}
        tempName={props.tempName}
        type="changeName"
        index={index}
      ></GridMessageBox>
    );
  }

  let edit_img = (
    <img
      className={classes.edit}
      src={edit}
      alt=""
      onClick={() => {
        props.onChangeName(props.title, props.tempName, index, "edit");
      }}
    ></img>
  );

  if (!props.editable) {
    edit_img = "";
  }
  let arrow = arrowRight;
  let expand_class = classes.expand;
  if (props.header === undefined || props.parent === undefined) {
    expand_class = classes.invisibalExpand + " " + classes.expand;
  }

  let add_img = "";
  if (props.header && props.parent && props.add_new_category !== undefined) {
    add_img = (
      <img
        src={add}
        alt=""
        className={classes.add}
        onClick={() =>
          props.onAddNewCategory(props.title, props.tempName, index, "add")
        }
      ></img>
    );

    if (props.add_new_category) {
      messageBox = (
        <GridMessageBox
          title={props.title}
          onKeyDown={props.onKeyDown}
          onChange={props.onChange}
          onClick={props.onAddNewCategory}
          tempName={props.tempName}
          type="addNewCategory"
          index={index}
        ></GridMessageBox>
      );
    }
  }
  let onExpandCategoryHandler = props.onExpandCategoryHandler;
  if (props.parent && props.expand) {
    arrow = arrowDown;
  }
  if (!props.parent) {
    onExpandCategoryHandler = (title) => {};
  }
  let expand_img = (
    <img
      className={expand_class}
      src={arrow}
      alt=""
      onClick={() => onExpandCategoryHandler(props.title)}
    ></img>
  );

  let cell_class = "";
  if (props.subCategory !== undefined && props.subCategory) {
    cell_class = classes.subCategory;
  }

  let delete_img = "";
  let onRemoveLine = props.onRemoveLine;
  if (props.onRemoveLine === undefined) onRemoveLine = () => {};
  if (props.header && props.rowIndex === undefined && props.editable) {
    delete_img = (
      <img
        src={remove}
        alt=""
        className={classes.expand}
        onClick={() => onRemoveLine(props.id)}
      ></img>
    );
  }

  return (
    <Col min={props.min} size={props.size}>
      <div className={cell_class}>
        {delete_img}
        {expand_img}
        <div className={classes.title}>
          <label>{props.title} </label>
        </div>
        {add_img}
        {edit_img}
        <div>{messageBox}</div>
      </div>
    </Col>
  );
};
