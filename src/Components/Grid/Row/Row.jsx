import React from "react";
import classes from "./Row.module.css";
export default (props) => {
  let style = {};
  if (props.border) {
    style.border = "1px solid #dfdfdf";
    style.borderRadius = "2px";
  }
  if (props.borderTop) {
    style.borderTop = "1px solid #dfdfdf";
    style.borderRadius = "2px";
  }
  if (props.borderBottom) {
    style.borderBottom = "1px solid #dfdfdf";
    style.borderRadius = "2px";
  }
  if (props.backgroundColor !== undefined) {
    style.backgroundColor = props.backgroundColor;
  }
  if (props.shadow !== undefined) {
    style.boxShadow = "2px 4px 10px gray";
  }

  return (
    <div className={classes.container} style={style}>
      {props.children}
    </div>
  );
};
