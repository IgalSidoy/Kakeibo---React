import React from "react";
import classes from "./Home.module.css";
import income_in_envelopes from "../../img/income-in-envelopes.png";
import Kakeibo_Thumbnail from "../../img/Kakeibo_Thumbnail.png";
import saving from "../../img/saving.jpg";
import { Link } from "react-router-dom";

export default class Home extends React.Component {
  render() {
    return (
      <div className={classes.container}>
        <div className={classes.row1}>
          <div className={classes.col2}>
            <div className={classes.header}>
              <img src={saving} alt=""></img>
            </div>
          </div>
        </div>
        <div className={classes.row2}>
          <div className={classes.col2}>
            <div className={classes.margin}>
              <p className={classes.p1}>
                <b>
                  <cite>WHAT IS KAKEBO? </cite>
                </b>
                Or technically, what is ‘a’ kakebo. Invented by Japanese
                journalist Hani Motoko at the turn of the 20th century,
                <cite>
                  ‘kakebo’ literally means ‘book of accounts for household
                  economy’.
                </cite>{" "}
                I know what you’re thinking. This sounds dry, dry, dry. But bear
                with me. This is a philosophy, not simply a statement of funds
                in and funds out.
              </p>
            </div>
            <div className={classes.row3}>
              <div className={classes.col4}>
                <Link to="/register">
                  <input
                    type="button"
                    value="Register"
                    className={classes.btn_user}
                  ></input>
                </Link>
              </div>
            </div>
          </div>

          <div className={classes.col1}>
            <div className={classes.margin}>
              <img src={Kakeibo_Thumbnail} alt=""></img>
            </div>
          </div>
          <div className={classes.col11}>
            <div className={classes.margin}>
              <img src={income_in_envelopes} alt=""></img>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
