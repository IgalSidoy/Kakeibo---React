import React from "react";

import GoogleLogin from "react-google-login";
import google_logo from "../../../../img/google-logo-small.png";
import classes from "./LoginButton.module.css";
export default (props) => {
  return (
    <div>
      <GoogleLogin
        clientId={props.google_client_id}
        buttonText="Login"
        onSuccess={props.onSuccess}
        onFailure={props.onFailure}
        cookiePolicy={"single_host_origin"}
        render={(renderProps) => (
          <div
            className={classes.login_btn}
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            <div className={classes.row + " " + classes.container}>
              <div className={classes.col_logo}>
                <img src={google_logo} alt=""></img>
              </div>
              <div className={classes.col_title}>{props.title}</div>
            </div>
          </div>
        )}
      />
    </div>
  );
};
