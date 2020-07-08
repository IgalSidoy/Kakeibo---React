import React from "react";
import Row from "../Grid/Row/Row";
import Col from "../Grid/Col/Col";
import Month from "./Month/Month";
import classes from "./DatePicker.module.css";
import arrowLeft from "../../img/arrow_back_ios-black-36dp.svg";
import arrowRight from "../../img/arrow_forward_ios-black-36dp.svg";
import arrowDown from "../../img/arrow_drop_down-24px.svg";

import monthsObj from "./months";

export default class DatePicker extends React.Component {
  state = {
    selected:
      new Date().toUTCString().toString().split(" ")[2] +
      " " +
      new Date().getFullYear(),
    firstQ: ["Jan", "Feb", "Mar", "Apr"],
    secondQ: ["May", "Jun", "Jul", "Aug"],
    thirdQ: ["Sep", "Oct", "Nov", "Dec"],
    selectedMonth: new Date().toUTCString().toString().split(" ")[2],
    year: new Date().getFullYear(),
    show: true,
  };
  render() {
    let calendarContainer = classes.calendarContainer;
    //calendarContainerHide
    let style = {};
    if (!this.state.show) {
      calendarContainer += " " + classes.calendarContainerHide;
      style.transform = "translateY(" + this.props.bottom + "px)";
    } else {
      calendarContainer += " " + classes.calendarContainerHide;
      style.transform = "translateY(" + this.props.top + "px)";
    }
    return (
      <div className={classes.container}>
        <Row>
          <Col size={1}>
            <div
              className={classes.arrowLeft}
              onClick={() => this.onChangeMonthHandler("sub")}
            >
              <img src={arrowLeft} alt={""}></img>
            </div>
          </Col>

          <Col size={2}>
            <div className={classes.title} onClick={this.showHideCalendar}>
              <Row>
                <Col size={1}>
                  <label>{this.state.selected}</label>
                </Col>
                <Col size={1} max={25}>
                  <img
                    src={arrowDown}
                    alt=""
                    style={{ filter: "invert()" }}
                  ></img>
                </Col>
              </Row>
            </div>
          </Col>
          <Col size={1}>
            <div
              className={classes.arrowRight}
              onClick={() => this.onChangeMonthHandler("add")}
            >
              <img src={arrowRight} alt={""}></img>
            </div>
          </Col>
        </Row>

        <div className={calendarContainer} style={style}>
          <Row>
            <Col size={1} min={50} max={50}>
              <div
                className={classes.arrow + " " + classes.invert}
                onClick={() => this.onChageYearHandler("min")}
              >
                <img src={arrowLeft} alt={""}></img>
              </div>
            </Col>
            <Col size={1}>
              <div className={classes.year}>
                <label>{this.state.year}</label>
              </div>
            </Col>
            <Col size={1} min={50} max={50}>
              <div
                className={classes.arrow + " " + classes.invert}
                onClick={() => this.onChageYearHandler("plus")}
              >
                <img src={arrowRight} alt={""}></img>
              </div>
            </Col>
          </Row>
          <hr></hr>
          <Row>
            {this.state.firstQ.map((month, key) => (
              <Col key={key} size={1} max={80}>
                <Month
                  title={month}
                  selected={this.state.selectedMonth}
                  onClick={this.onClickMonth}
                ></Month>
              </Col>
            ))}
          </Row>
          <Row>
            {this.state.secondQ.map((month, key) => (
              <Col key={key} size={1} max={80}>
                <Month
                  title={month}
                  selected={this.state.selectedMonth}
                  onClick={this.onClickMonth}
                ></Month>
              </Col>
            ))}
          </Row>
          <Row>
            {this.state.thirdQ.map((month, key) => (
              <Col key={key} size={1} max={80}>
                <Month
                  title={month}
                  selected={this.state.selectedMonth}
                  onClick={this.onClickMonth}
                ></Month>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    );
  }
  onClickMonth = (month) => {
    let newTitle = month + " " + this.state.year;

    let new_month = newTitle.split(" ")[0];
    let new_year = newTitle.split(" ")[1];
    let date_for_fetch_data =
      monthsObj.indexConvert2[new_month] + "-" + new_year;
    this.props.selectDateHandler(date_for_fetch_data);

    this.setState({
      selectedMonth: month,
      selected: newTitle,
    });
    this.showHideCalendar();
  };
  showHideCalendar = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  onChageYearHandler = (type) => {
    let old_year = this.state.year;
    if (type === "min") {
      old_year--;
    }
    if (type === "plus") {
      old_year++;
    }

    const selected = this.state.selected.split(" ")[0] + " " + old_year;

    let new_month = selected.split(" ")[0];
    let new_year = selected.split(" ")[1];
    let date_for_fetch_data =
      monthsObj.indexConvert2[new_month] + "-" + new_year;
    this.props.selectDateHandler(date_for_fetch_data);

    this.setState({
      year: old_year,
      selected,
    });
  };
  onChangeMonthHandler = (type) => {
    let new_month = monthsObj.months[this.state.selectedMonth];
    let new_year = this.state.year;
    let monthIndex = monthsObj.indexConvert[new_month];
    if (type === "sub") {
      monthIndex--;
      if (monthIndex < 0) {
        monthIndex = 11;
        new_year--;
      }
    }
    if (type === "add") {
      monthIndex++;
      if (monthIndex > 11) {
        monthIndex = 0;
        new_year++;
      }
    }
    new_month = monthsObj.months[monthIndex];

    let new_selected = new_month + " " + new_year;

    let date_for_fetch_data =
      monthsObj.indexConvert2[new_month] + "-" + new_year;
    this.props.selectDateHandler(date_for_fetch_data);

    this.setState({
      year: new_year,
      selectedMonth: new_month,
      selected: new_selected,
    });
  };
}
