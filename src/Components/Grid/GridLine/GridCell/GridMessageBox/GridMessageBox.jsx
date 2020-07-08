import React from "react";
import Row from "../../../Row/Row";
import Col from "../../../Col/Col";
import classes from "./GridMessageBox.module.css";

export default (props) => {
  return (
    <Row>
      <Col size={1}>
        <div className={classes.triangleUp}></div>
        <div className={classes.updateContainer}>
          <input
            autoFocus
            type="text"
            value={props.tempName}
            onChange={(e) => props.onChange(e)}
            placeholder={props.title}
            onKeyDown={(e) =>
              props.onKeyDown(
                props.type,
                props.title,
                props.tempName,
                props.index,
                e.keyCode
              )
            }
          ></input>
          <Row>
            <Col size={1}>
              <div
                className={classes.btnCancel}
                onClick={() => {
                  props.onClick(
                    props.title,
                    props.tempName,
                    props.index,
                    "cancel"
                  );
                }}
              >
                <label>Cancel</label>
              </div>
            </Col>
            <Col size={1}>
              <div
                className={classes.btnOK}
                onClick={() => {
                  props.onClick(
                    props.title,
                    props.tempName,
                    props.index,
                    "update"
                  );
                }}
              >
                <label>OK</label>
              </div>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
};
