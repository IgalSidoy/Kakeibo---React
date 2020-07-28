import React, { useState } from "react";
import classes from "../CategoryGridExpense.module.css";
import TextField from "@material-ui/core/TextField";
import list_img from "../../../../img/list-24px.svg";

export default (props) => {
  const [showExtra, setShowExtra] = useState(false);

  let exp_list = classes.row_list;
  if (!showExtra) exp_list = classes.row_list + " " + classes.hide;

  let drop_down_class = classes.icon;

  if (showExtra) drop_down_class = classes.icon + " " + classes.active;

  let col2 = classes.col2;
  if (showExtra) col2 = classes.col2 + " " + classes.active;

  let col = classes.col;
  if (showExtra) col = classes.col + " " + classes.active;
  let color_line = "black";
  if (showExtra) color_line = "white";
  return (
    <React.Fragment>
      <div className={classes.row}>
        <div
          className={drop_down_class}
          onClick={() => {
            setShowExtra(!showExtra);
          }}
        >
          <img src={list_img} alt="" className={classes.icon_img}></img>
        </div>
        <div className={col2}>
          <TextField
            label={"category"}
            size="small"
            variant="outlined"
            fullWidth={true}
            type={"text"}
            disabled={true}
            value={props.exp.title}
            InputProps={{
              style: {
                color: props.color,
                fontSize: props.fontSize,
              },
            }}
            InputLabelProps={{
              style: {
                color: props.exp_line_color,
                fontSize: props.labelSize,
              },
            }}
          ></TextField>
        </div>
        <div className={col}>
          <TextField
            label={"total"}
            size="small"
            variant="outlined"
            fullWidth={true}
            type={"text"}
            disabled={true}
            value={props.exp.total + props.symbol}
            InputProps={{
              style: {
                color: props.color,
                fontSize: props.fontSize,
              },
            }}
            InputLabelProps={{
              style: {
                color: props.exp_line_color,
                fontSize: props.labelSize,
              },
            }}
          ></TextField>
        </div>
      </div>
      {props.exp.exp_list.map((exp, key) => (
        <div className={exp_list} key={key}>
          <div className={classes.icon_index}>{key + 1}</div>

          <div className={classes.col_list2}>
            <TextField
              label={"title"}
              size="small"
              variant="outlined"
              fullWidth={true}
              type={"text"}
              disabled={true}
              value={exp.title}
              InputProps={{
                style: {
                  color: props.color,
                  fontSize: props.fontSize,
                },
              }}
              InputLabelProps={{
                style: {
                  color: props.exp_line_color,
                  fontSize: props.labelSize,
                },
              }}
            ></TextField>
          </div>
          <div className={classes.col_list}>
            <TextField
              label={"sum"}
              size="small"
              variant="outlined"
              fullWidth={true}
              type={"text"}
              disabled={true}
              value={exp.sum}
              InputProps={{
                style: {
                  color: props.color,
                  fontSize: props.fontSize,
                },
              }}
              InputLabelProps={{
                style: {
                  color: props.exp_line_color,
                  fontSize: props.labelSize,
                },
              }}
            ></TextField>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
};
