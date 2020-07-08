import React from "react";
import { GoogleLogout } from "react-google-login";
import google_logo from "../../../../img/google-logo.png";
import logout_icon from "../../../../img/power_settings_new-24px.svg";
import classes from "./LogoutButton.module.css";
export default (props) => {
  let button = (
    <div>
      <GoogleLogout
        clientId="46054061299-9kephk411vj360n7ui9dpeo88uvpujrh.apps.googleusercontent.com"
        buttonText="Logout"
        onLogoutSuccess={props.onClick}
        render={(renderProps) => (
          <div
            className={classes.login_btn}
            onClick={props.onClick}
            disabled={renderProps.disabled}
            Login
            with
            google
          >
            <div className={classes.col_logo}>
              <img src={google_logo} alt=""></img>
            </div>
            <div className={classes.col_title}>
              <label>{props.title}</label>
            </div>
          </div>
        )}
      ></GoogleLogout>
    </div>
  );
  if (props.icon !== undefined) {
    button = (
      <div>
        <GoogleLogout
          clientId={props.google_client_id}
          buttonText="Logout"
          onLogoutSuccess={props.onClick}
          render={(renderProps) => (
            <div
              className={classes.icon_logout}
              onClick={props.onClick}
              disabled={renderProps.disabled}
            >
              <div className={classes.text}>{props.title}</div>
              <div className={classes.icon}>
                <img src={logout_icon} alt=""></img>
              </div>
            </div>
          )}
        ></GoogleLogout>
      </div>
    );
  }

  if (props.no_UI !== undefined) {
    button = (
      <div>
        <GoogleLogout
          clientId={props.google_client_id}
          buttonText="Logout"
          onLogoutSuccess={props.onClick}
          render={(renderProps) => (
            <div onClick={props.onClick} disabled={renderProps.disabled}>
              {props.button}
            </div>
          )}
        ></GoogleLogout>
      </div>
    );
  }

  return button;
};
