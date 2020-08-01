import React from "react";
import classes from "./FAB.module.css";
import create from "../../../img/add-24px.svg";
export default (props) => {
  let btn_size = "";
  if (props.size === "small") {
    btn_size = classes.small;
  }
  if (props.size === "medium") {
    btn_size = classes.medium;
  }
  if (props.size === "large") {
    btn_size = classes.large;
  }
  let shahow = classes.shahow;
  let container = classes.container + " " + shahow + " " + btn_size;

  let style = {
    backgroundColor: props.color,
  };

  if (props.top !== undefined) {
    style.top = props.top;
  }

  if (props.left !== undefined) {
    style.left = props.left;
  }
  let icon_class = classes.invert;
  if (props.invert !== undefined) {
    icon_class = classes.invert;
  }
  let title = "";
  if (props.title !== undefined) {
    title = props.title;
  }
  return (
    <div className={container} style={style} onClick={props.onClick}>
      <div className={classes.title}>
        <label>{title}</label>
      </div>
    </div>
  );
};
