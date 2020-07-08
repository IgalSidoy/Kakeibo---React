import React from "react";
import classes from "./Col.module.css";
export default (props) => {
  let container = "";
  if (props.border !== undefined) container += " " + classes.border;

  if (props.borderRight !== undefined) container += " " + classes.border_right;
  let size = "col" + props.size;
  container += " " + classes[size];
  let style = {};
  if (props.min !== undefined) {
    style.minWidth = props.min;
  }
  if (props.max !== undefined) {
    style.maxWidth = props.max;
  }
  if (props.backgroundColor !== undefined) {
    style.backgroundColor = props.backgroundColor;
  }
  if (props.round !== undefined) {
    style.borderRadius = "10px";
  }

  return (
    <div style={style} className={container}>
      {props.children}
    </div>
  );
};
