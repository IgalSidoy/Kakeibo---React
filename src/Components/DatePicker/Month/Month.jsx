import React from "react";
import classes from "./Month.module.css";
export default props => {
  let container = classes.container;
  if (props.selected === props.title) {
    container = classes.selected;
  }
  return (
    <div className={container} onClick={() => props.onClick(props.title)}>
      {props.title}
    </div>
  );
};
