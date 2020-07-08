import React from "react";
import Row from "../../../Components/Grid/Row/Row";
import Col from "../../../Components/Grid/Col/Col";
import classes from "./BudgetHeader.module.css";
import DatePicker from "../../../Components/DatePicker/DatePicker";
export default (props) => {
  return (
    <div className={classes.container}>
      <Row>
        <Col size={3} min={250} max={350}>
          <div className={classes.title + " " + classes.borderRight}>
            <DatePicker
              top={-500}
              bottom={-10}
              selectDateHandler={props.selectDateHandler}
            ></DatePicker>
          </div>
        </Col>

        <Col size={5}>
          <div className={classes.header_title}>
            <label>{props.title}</label>
          </div>
        </Col>
      </Row>
    </div>
  );
};
