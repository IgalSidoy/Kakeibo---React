import React from "react";
import Row from "../../../Components/Grid/Row/Row";
import Col from "../../../Components/Grid/Col/Col";
import classes from "./BudgetHeader.module.css";
import DatePicker from "../../../Components/DatePicker/DatePicker";
export default (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.title + " " + classes.borderRight}>
        <DatePicker
          top={-10}
          bottom={-10}
          selectDateHandler={props.selectDateHandler}
        ></DatePicker>
      </div>
    </div>
  );
};
