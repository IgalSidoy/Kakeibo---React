import React, { useState } from "react";
import Row from "../Row/Row";
import Col from "../Col/Col";
import GridMessageBox from "../GridLine/GridCell/GridMessageBox/GridMessageBox";
import chkBox_off from "../../../img/check_box_outline_blank-24px.svg";
import chkBox_on from "../../../img/check_box-24px.svg";
import add from "../../../img/control_point-24px.svg";
import classes from "./GridHeader.module.css";

export default (props) => {
  const [clicked, setClick] = useState(false);

  let img = chkBox_off;
  if (!clicked) img = chkBox_on;

  const click = () => {
    setClick(!clicked);
    props.onChangeHandler("edit", clicked);
  };
  let messageBox = (
    <GridMessageBox
      title={"new category"}
      onKeyDown={props.onKeyDown}
      onChange={props.onChange}
      onClick={props.onChangeName}
      tempName={props.tempName}
      type="createNewCategory"
      index={""}
    ></GridMessageBox>
  );
  if (!props.add_Category) messageBox = "";
  return (
    <Row borderBottom>
      <Col size={1}>
        <Row>
          <Col size={2} min={180} max={180}>
            <div className={classes.clickContainer}>
              <div className={classes.click_label}>
                <label>Category Group</label>
                <img
                  src={add}
                  alt=""
                  onClick={() => props.onChangeName("", "", "", "show")}
                ></img>
              </div>
            </div>
            {messageBox}
          </Col>
          <Col size={1} min={100} max={100}>
            <div className={classes.clickContainer}>
              <div className={classes.click_label}>
                <label>edit </label>
                <img src={img} alt="" onClick={click}></img>
              </div>
            </div>
          </Col>
        </Row>
      </Col>
      <Col size={3}></Col>
    </Row>
  );
};
