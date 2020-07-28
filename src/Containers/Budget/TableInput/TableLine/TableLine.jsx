import React, { useState } from "react";
import classes from "../TableInput.module.css";
import Button from "@material-ui/core/button";
import ButtonSelect from "../../../../Components/InputSelect/InputSelect";
import arrow_right from "../../../../img/arrow_right-24px.svg";
import arrow_down from "../../../../img/arrow_drop_down-24px.svg";

export default (props) => {
  const [show_delete_btn, setShow_delete_btn] = useState(
    props.screeWidth >= 850 ? true : false
  );
  const [touch_start, SetTouch_start] = useState(0);

  const [expand, setExpand] = useState(false);

  let autoFocus = false;
  if (props.screeWidth >= 850) {
    autoFocus = true;
  }

  const onTouch = (type, e) => {
    if (props.screeWidth >= 850) {
      return;
    }
    const sensetivity = 60;
    if (type === "start") {
      SetTouch_start(e.targetTouches[0].clientX);
      return;
    }
    if (type === "move") {
      const x_position = e.changedTouches[0].clientX;
      const moved = touch_start - x_position;
      if (moved > sensetivity) {
        setShow_delete_btn(true);
      }
      if (moved < sensetivity * -1) {
        setShow_delete_btn(false);
      }
      return;
    }
    setShow_delete_btn(true);
  };

  const onDelete = (name, id) => {
    setShow_delete_btn(false);
    props.delete_rec_by_id(name, id);
  };

  let delete_button = classes.col + " " + classes.delete_buton_show_moblie;

  if (props.screeWidth > 600) {
    delete_button = classes.col + " " + classes.delete_buton_show_tablet;
  }

  if (!show_delete_btn) {
    delete_button = classes.col + " " + classes.delete_buton_hide_mobile;
    if (props.screeWidth > 600) {
      delete_button = classes.col + " " + classes.delete_buton_hide_tablet;
    }
  }

  let categories = [
    { value: "cat-1", label: "1" },
    { value: "cat-2", label: "2" },
  ];

  let payments = (
    <div
      className={
        classes.col + " " + classes.desktop_cells + " " + classes.mobile_cell
      }
    >
      <ButtonSelect
        value={props.payments}
        label={"payments"}
        pattern={{ inputMode: "numeric" }}
        onKeyPress={(e) => props.onKeyPress(e.keyCode)}
        onChange={(e) =>
          props.onChange(
            props.name,
            props.index,
            "payments",
            e.target,
            props.id,
            props.from_date,
            props.to_date,
            props.updated
          )
        }
      ></ButtonSelect>
    </div>
  );

  if (props.table_title !== "Fixed Expenses") payments = "";

  let line = (
    <div
      className={classes.row + " " + classes.border}
      onTouchStart={(e) => onTouch("start", e)}
      onTouchEnd={(e) => onTouch("move", e)}
    >
      <div className={classes.col}>
        <ButtonSelect
          value={props.title}
          isSelect={false}
          label={"title"}
          OnBlurHandler={(e) => {
            props.saveUpdateValueHandler(
              props.name,
              props.index,
              "title",
              e.target,
              props.id,
              props.from_date,
              props.to_date,
              props.updated
            );
          }}
          onChange={(e) =>
            props.onChange(
              props.name,
              props.index,
              "title",
              e.target,
              props.id,
              props.from_date,
              props.to_date,
              props.updated
            )
          }
        ></ButtonSelect>
      </div>
      <div
        className={
          classes.col + " " + classes.desktop_cells + " " + classes.mobile_cell
        }
      >
        <ButtonSelect
          value={props.category}
          isSelect={true}
          label={"category"}
          dataSet={props.categories}
          OnBlurHandler={(e) => {
            props.saveUpdateValueHandler(
              props.name,
              props.index,
              "category",
              e.target,
              props.id,
              props.from_date,
              props.to_date,
              props.updated
            );
          }}
          onChange={(e) =>
            props.onChange(
              props.name,
              props.index,
              "category",
              e.target,
              props.id,
              props.from_date,
              props.to_date,
              props.updated
            )
          }
        ></ButtonSelect>
      </div>
      {payments}
      <div className={classes.col}>
        <ButtonSelect
          value={props.sum}
          isSelect={false}
          label={"sum - " + props.symbol}
          // pattern={{ inputMode: "numeric" }}
          OnBlurHandler={(e) => {
            props.saveUpdateValueHandler(
              props.name,
              props.index,
              "sum",
              e.target,
              props.id,
              props.from_date,
              props.to_date,
              props.updated
            );
          }}
          onChange={(e) =>
            props.onChange(
              props.name,
              props.index,
              "sum",
              e.target,
              props.id,
              props.from_date,
              props.to_date,
              props.updated
            )
          }
        ></ButtonSelect>
      </div>

      {props.remove_enabled ? (
        <div className={delete_button + " " + classes.deskto_delete_button}>
          <Button
            size="small"
            variant="contained"
            color={"secondary"}
            onClick={() => {
              onDelete(props.table_title, props.id);
            }}
          >
            remove
          </Button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
  if (props.screeWidth >= 850) {
    return line;
  }

  if (props.table_title === "Fixed Expenses") {
    payments = (
      <ButtonSelect
        value={props.payments}
        label={"payments"}
        pattern={{ inputMode: "numeric" }}
        onChange={(e) =>
          props.onChange(
            props.name,
            props.index,
            "payments",
            e.target,
            props.id,
            props.from_date,
            props.to_date,
            props.updated
          )
        }
      ></ButtonSelect>
    );
  } else {
    payments = "";
  }

  let updated = props.recored_updated;
  if (props.recored_updated !== undefined) {
    updated = props.recored_updated.split(".")[0].split("T");
    updated = updated[1] + " " + updated[0];
  }

  let extra = (
    <div className={classes.extra_row}>
      <div className={classes.line}>
        <ButtonSelect
          value={props.title}
          isSelect={false}
          label={"title"}
          OnBlurHandler={(e) => {
            props.saveUpdateValueHandler(
              props.name,
              props.index,
              "title",
              e.target,
              props.id,
              props.from_date,
              props.to_date,
              props.updated
            );
          }}
          onChange={(e) =>
            props.onChange(
              props.name,
              props.index,
              "title",
              e.target,
              props.id,
              props.from_date,
              props.to_date,
              props.updated
            )
          }
        ></ButtonSelect>
      </div>
      <div className={classes.line}>
        <ButtonSelect
          value={props.sum}
          isSelect={false}
          label={"sum - " + props.symbol}
          pattern={{ inputMode: "numeric" }}
          OnBlurHandler={(e) => {
            props.saveUpdateValueHandler(
              props.name,
              props.index,
              "sum",
              e.target,
              props.id,
              props.from_date,
              props.to_date,
              props.updated
            );
          }}
          onChange={(e) =>
            props.onChange(
              props.name,
              props.index,
              "sum",
              e.target,
              props.id,
              props.from_date,
              props.to_date,
              props.updated
            )
          }
        ></ButtonSelect>
      </div>
      <div className={classes.line}>
        <ButtonSelect
          value={props.category}
          isSelect={true}
          label={"category"}
          dataSet={props.categories}
          OnBlurHandler={(e) => {
            props.saveUpdateValueHandler(
              props.name,
              props.index,
              "category",
              e.target,
              props.id,
              props.from_date,
              props.to_date,
              props.updated
            );
          }}
          onChange={(e) =>
            props.onChange(
              props.name,
              props.index,
              "category",
              e.target,
              props.id,
              props.from_date,
              props.to_date,
              props.updated
            )
          }
        ></ButtonSelect>
      </div>
      <div className={classes.line}>{payments}</div>
      <div className={classes.line}>
        <ButtonSelect
          disabled={true}
          value={updated}
          isSelect={false}
          label={"updated"}
        ></ButtonSelect>
      </div>
    </div>
  );
  let img_expand = arrow_down;

  if (!expand) {
    extra = "";
    img_expand = arrow_right;
  }
  line = (
    <div>
      <div
        className={classes.row + " " + classes.border}
        onTouchStart={(e) => onTouch("start", e)}
        onTouchEnd={(e) => onTouch("move", e)}
        onClick={() => {
          setExpand(!expand);
        }}
      >
        <div className={classes.expand_line}>
          <img src={img_expand} alt=""></img>
        </div>
        <div className={classes.col}>
          <div className={classes.line_title + " " + classes.text_left}>
            <label>{props.title}</label>
          </div>
        </div>

        <div className={classes.col}>
          <div className={classes.line_title + " " + classes.text_right}>
            <label>
              {
                // eslint-disable-next-line no-new-wrappers
                props.symbol + new Number(props.sum).toLocaleString()
              }
            </label>
          </div>
        </div>

        {props.remove_enabled ? (
          <div className={delete_button + " " + classes.deskto_delete_button}>
            <Button
              size="small"
              variant="contained"
              color={"secondary"}
              onClick={() => {
                onDelete(props.table_title, props.id);
              }}
            >
              remove
            </Button>
          </div>
        ) : (
          ""
        )}
      </div>

      {extra}
    </div>
  );

  return line;
};
