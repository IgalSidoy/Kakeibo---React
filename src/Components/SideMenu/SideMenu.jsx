import React from "react";
import classes from "./SideMenu.module.css";

import SideMenuLink from "./SideMenuLink/SideMenuLink";
import { Link } from "react-router-dom";
import settings_icon from "../../img/settings-24px.svg";
import payment_icon from "../../img/payment-24px.svg";
import reports_icon from "../../img/trending_up-24px.svg";
import home from "../../img/home-24px.svg";
import power_off_icon from "../../img/power_settings_new-24px.svg";
//

//
export default class SideMenu extends React.Component {
  state = {
    title: "My Budget",
    links: [
      { title: "Budget", url: "/budget/expenses", icon: payment_icon },
      { title: "Reports", url: "/reports", icon: reports_icon },
      { title: "Settings", url: "/settings", icon: settings_icon },
    ],
    extra_links: [
      { title: "logout", url: "/home", icon: power_off_icon, logout: true },
    ],
    selected_link: "",
  };

  render() {
    let style = {};

    if (this.props.height !== undefined)
      style.height = this.props.height + "px";
    return (
      <div className={classes.logout_container} style={style}>
        <div className={classes.container}>
          <div className={classes.col2}>
            <Link to={"/home"}>
              <div
                className={classes.title}
                onClick={() => this.onClickHandler("")}
              >
                <div className={classes.text}>
                  <label>{this.state.title}</label>
                </div>
                <div className={classes.icon}>
                  <img src={home} alt=""></img>
                </div>
              </div>
            </Link>
          </div>

          {this.state.links.map((link, key) => (
            <div key={key}>
              <Link to={link.url}>
                <SideMenuLink
                  title={link.title}
                  icon={link.icon}
                  selected={this.state.selected_link}
                  onClick={this.onClickHandler}
                ></SideMenuLink>
              </Link>
            </div>
          ))}
          <hr></hr>
          {this.state.extra_links.map((link, key) => (
            <div key={key}>
              <Link to={link.url}>
                <SideMenuLink
                  title={link.title}
                  icon={link.icon}
                  selected={this.state.selected_link}
                  onClick={this.onClickHandler}
                  logout={link.logout}
                  google_client_id={this.props.google_client_id}
                  onLogOut={this.props.onLogOutHandler}
                ></SideMenuLink>
              </Link>
            </div>
          ))}
          <hr></hr>
        </div>
      </div>
    );
  }
  onClickHandler = (type) => {
    if (type === "logout") {
      type = "";
    }
    this.setState({
      selected_link: type,
    });
    this.props.OnSelectMenu();
  };
}
