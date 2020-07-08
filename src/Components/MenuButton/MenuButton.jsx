import React from "react";
import classes from "./MenuButton.module.css";
export default (props) => {
  return (
    <div className={classes.row}>
      <div className={classes.col1}>
        <div className={classes.lineContainer} onClick={props.onClick}>
          <div className={classes.line}></div>
          <div className={classes.line}></div>
          <div className={classes.line}></div>
        </div>
      </div>
    </div>
  );
};
