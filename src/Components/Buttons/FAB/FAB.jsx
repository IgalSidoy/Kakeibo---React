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
  let container = classes.container + " " + shahow;

  let style = {
    backgroundColor: props.color,
    border: "1px solid white",
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
  return (
    <div className={container} style={style} onClick={props.onClick}>
      <div className={btn_size + " " + classes.img}>
        <img src={create} alt="+" className={icon_class}></img>
      </div>
    </div>
  );
};
