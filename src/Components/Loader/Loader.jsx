import React from "react";
import classes from "./Loader.module.css";

export default () => {
  return (
    <div>
      <div className={classes.lds_ellipsis}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
