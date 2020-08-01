import React, { useState } from "react";
import classes from "./Menu.module.css";
import MenuBox from "../../../Components/MenuBox/MenuBox";
import tray from "../../../img/arrow_back_ios-black-36dp.svg";
export default (props) => {
  let menuStyle = {};
  menuStyle.color = "white";
  const [show, setShow] = useState(true);
  const [linkSelected, setLinkSelected] = useState("expenses");

  if (window.innerWidth >= 850) {
    if (show) {
      menuStyle.transform = "translateX(0px)";
      menuStyle.transitionDuration = "0.3s";
      menuStyle.margin = "none";
      menuStyle.width = "150px";
      menuStyle.position = "absolute";
      menuStyle.zIndex = 1;
      menuStyle.color = "white";
    } else {
      menuStyle.transform = "translateX(-160px)";
      menuStyle.transitionDuration = "0.3s";
      menuStyle.position = "absolute";
      menuStyle.zIndex = 1;
      menuStyle.color = "transparent";
    }
  }

  let income_class = classes.cell1 + " " + classes.income_color;
  let saving_class = classes.cell1 + " " + classes.saving_color;
  let fixed_expenses_class = classes.cell2 + " " + classes.fixed_expenses_color;
  let expenses_class = classes.cell1 + " " + classes.expenses_color;
  if (linkSelected === "income") income_class += " " + classes.selected;
  if (linkSelected === "saving") saving_class += " " + classes.selected;
  if (linkSelected === "fixed_expenses")
    fixed_expenses_class += " " + classes.selected;
  if (linkSelected === "expenses") expenses_class += " " + classes.selected;

  let col_back_st = classes.col_back;
  if (!show) {
    col_back_st += " " + classes.back_btn_rotate + " " + classes.back_btn_right;
  }
  //
  return (
    <div className={classes.container} style={menuStyle}>
      <div className={classes.cell3} onClick={() => setShow(!show)}>
        <MenuBox title="" small>
          <div className={classes.row_back}>
            <div className={col_back_st}>
              <img src={tray} alt=""></img>
            </div>
            <div className={col_back_st}>
              <img src={tray} alt=""></img>
            </div>
            <div className={col_back_st}>
              <img src={tray} alt=""></img>
            </div>
          </div>
        </MenuBox>
      </div>
      <div className={income_class} onClick={() => setLinkSelected("income")}>
        <MenuBox
          small
          title={props.data.income.title}
          path={props.data.income.path}
        ></MenuBox>
      </div>
      <div className={saving_class} onClick={() => setLinkSelected("saving")}>
        <MenuBox
          small
          title={props.data.saving.title}
          path={props.data.saving.path}
        ></MenuBox>
      </div>
      <div
        className={fixed_expenses_class}
        onClick={() => setLinkSelected("fixed_expenses")}
      >
        <MenuBox
          small
          title={props.data.const_expense.title}
          path={props.data.const_expense.path}
        ></MenuBox>
      </div>
      <div
        className={expenses_class}
        onClick={() => setLinkSelected("expenses")}
      >
        <MenuBox
          small
          title={props.data.expense.title}
          path={props.data.expense.path}
        ></MenuBox>
      </div>
    </div>
  );
};
