import React from "react";
import classes from "./MenuBox.module.css";
import { Link } from "react-router-dom";
export default (props) => {
  let container = classes.container;
  if (props.small !== undefined) {
    container = classes.container_small;
  }

  let component = "";
  if (props.path !== undefined) {
    component = (
      <Link to={props.path}>
        <div className={container}>
          <div>
            <label>{props.title}</label>
            {props.children}
          </div>
        </div>
      </Link>
    );
  } else {
    component = (
      <div className={container}>
        <div>
          <label>{props.title}</label>
          {props.children}
        </div>
      </div>
    );
  }

  return component;
};
