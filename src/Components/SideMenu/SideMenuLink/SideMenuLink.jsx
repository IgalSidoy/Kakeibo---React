import React from "react";
import classes from "./SideMenuLink.module.css";
import GoogleLogoutButton from "../../../Containers/Login/LoginGoogle/LogoutButton/LogoutButton";

export default (props) => {
  let container = classes.container;
  if (props.selected === props.title) {
    container = classes.selected;
  }
  let icon = "";
  if (props.icon !== undefined) {
    icon = <img src={props.icon} alt=""></img>;
  }

  if (props.logout !== undefined) {
    return (
      <GoogleLogoutButton
        onClick={props.onLogOut}
        title={props.title}
        no_UI
        google_client_id={props.google_client_id}
        button={
          <div
            className={container}
            onClick={() => {
              props.onClick(props.title);
            }}
          >
            <div className={classes.title}>
              <label>{props.title}</label>
            </div>
            <div className={classes.icon}>{icon}</div>
          </div>
        }
      ></GoogleLogoutButton>
    );
  }

  return (
    <div
      className={container}
      onClick={() => {
        props.onClick(props.title);
      }}
    >
      <div className={classes.title}>
        <label>{props.title}</label>
      </div>
      <div className={classes.icon}>{icon}</div>
    </div>
  );
};
