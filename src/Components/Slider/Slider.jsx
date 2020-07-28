import React, { Component } from "react";
import classes from "./Slider.module.css";
import arrow_forword from "../../img/arrow_forward_ios-black-36dp.svg";
import arrow_back from "../../img/arrow_back_ios-black-36dp.svg";
import Chart from "../Charts/Chart/Chart";
import CategoryGridExpense from "./CategoryGridExpense/CategoryGridExpense";

export default class Slider extends Component {
  state = {
    screen: 1,
    touch_start: 0,
  };

  render() {
    let screen_1_class = classes.dot;
    let screen_2_class = classes.dot;
    let screen_1_container_1 = classes.col11;
    let screen_1_container_2 = classes.col12;

    let container_style = { height: window.innerHeight - 180 };
    if (this.props.screen_width < 480) {
      container_style = { height: window.innerHeight - 170 };
    }
    if (this.state.screen === 1) {
      screen_1_class += " " + classes.dot_selected;

      screen_1_container_1 += " " + classes.flex_1;
      screen_1_container_2 += " " + classes.hide;
    }
    if (this.state.screen === 2) {
      screen_2_class += " " + classes.dot_selected;
      screen_1_container_1 += " " + classes.hide;
      screen_1_container_2 += " " + classes.flex_1;
    }

    return (
      <div>
        <div
          className={classes.container}
          onTouchStart={(e) => this.onTouch("start", e)}
          onTouchEnd={(e) => this.onTouch("move", e)}
          style={container_style}
        >
          <div className={screen_1_container_1}>
            <div className={classes.screen_row}>
              <div className={classes.screen_col}>
                <CategoryGridExpense
                  load={this.state.screen === 1 ? true : false}
                  category={this.props.category}
                  symbol={this.props.symbol}
                ></CategoryGridExpense>
              </div>
            </div>
          </div>
          <div className={screen_1_container_2}>
            <div className={classes.screen_row}>
              <div className={classes.screen_col}></div>

              <div className={classes.screen_col}>
                <div className={classes.shadow1}>
                  <Chart data={this.props.screen_2}></Chart>
                </div>
              </div>
              <div className={classes.screen_col}></div>
            </div>
          </div>
        </div>

        <div className={classes.footer}>
          <div
            className={classes.col_btn}
            onClick={() => {
              let screen = this.state.screen - 1;
              if (this.state.screen === 1) return;
              this.setState({
                screen: screen,
              });
            }}
          >
            <div className={classes.btn_back}>
              <img src={arrow_back} alt=""></img>
            </div>
          </div>
          <div className={classes.col_circle}>
            <div className={screen_1_class}>.</div>
            <div className={screen_2_class}>.</div>
          </div>
          <div
            className={classes.col_btn}
            onClick={() => {
              let screen = this.state.screen + 1;
              if (this.state.screen === 2) return;
              this.setState({
                screen: screen,
              });
            }}
          >
            <div className={classes.btn_forword}>
              <img src={arrow_forword} alt=""></img>
            </div>
          </div>
        </div>
      </div>
    );
  }
  onTouch = (type, e) => {
    if (window.innerWidth >= 850) {
      return;
    }
    const sensetivity = 40;
    if (type === "start") {
      /*
      :0,
    touch_end */

      this.setState({
        touch_start: e.targetTouches[0].clientX,
      });
      return;
    }
    if (type === "move") {
      const x_position = e.changedTouches[0].clientX;
      const moved = this.state.touch_start - x_position;
      if (moved > sensetivity) {
        let screen = this.state.screen + 1;
        if (screen > 2) return;
        this.setState({
          screen: screen,
        });
      }
      if (moved < sensetivity * -1) {
        let screen = this.state.screen - 1;
        if (screen < 1) return;
        this.setState({
          screen: screen,
        });
      }
      return;
    }
  };
}
