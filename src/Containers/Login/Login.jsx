import React, { Component } from "react";
import classes from "./Login.module.css";
import GoogleLoginButton from "./LoginGoogle/LoginButton/LoginButton";
import TextField from "@material-ui/core/TextField";
import { Redirect, Link } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";

export default class Login extends Component {
  state = {
    name: "",
    email: "",
    title: "Login",
    loginURL: "/api/user/login",
    password: "",
    redirect: false,
    error: "",
    signing_in: false,
  };

  constructor() {
    super();
    this.state.name = localStorage.getItem("name");
    this.state.email = localStorage.getItem("email");
    this.state.user_img = localStorage.getItem("user_img");
  }

  render() {
    if (this.props.user.logedIn || this.state.redirect)
      return <Redirect to={"/home"} />;

    let login = (
      <div className={classes.loader}>
        <Loader></Loader>
      </div>
    );
    if (!this.state.signing_in) login = <label>login</label>;
    return (
      <div className={classes.imgBack}>
        <div className={classes.container}>
          <div className={classes.title}>{this.state.title}</div>

          <div className={classes.rowLine}>
            <div className={classes.col_input}>
              <TextField
                type="email"
                label="email"
                variant="outlined"
                autoFocus={true}
                fullWidth={true}
                onChange={(e) => {
                  this.onChange("email", e.target.value);
                }}
              />
            </div>
            <div className={classes.col_input}>
              <TextField
                label="password"
                variant="outlined"
                type="password"
                fullWidth={true}
                value={this.state.password}
                onChange={(e) => {
                  this.onChange("password", e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.keyCode === 13) {
                    this.loginHandler();
                  }
                }}
              />
            </div>
            <div className={classes.error_message}>
              <label>{this.state.error}</label>
            </div>
            <div className={classes.col}>
              <div className={classes.button} onClick={this.loginHandler}>
                {login}
              </div>
            </div>
            <div className={classes.col}>
              <label style={{ color: "gray" }}>Don't have an account?</label>
              <Link to={"/register"}>
                <label
                  style={{
                    color: "#3a3a3a",
                    cursor: "pointer",
                    fontWeight: 650,
                  }}
                >
                  Sign Up
                </label>
              </Link>
            </div>
          </div>

          <div className={classes.buttons + " " + classes.hide}>
            <GoogleLoginButton
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              title={"Login with google"}
              google_client_id={this.props.google_client_id}
            ></GoogleLoginButton>
          </div>
        </div>
      </div>
    );
  }

  onChange(type, value) {
    if (type === "email") {
      this.setState({
        email: value,
      });
    }
    if (type === "password") {
      this.setState({
        password: value,
      });
    }
  }

  logout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("user_img");
    this.setState({
      name: "",
      email: "",
    });
    this.props.loginValidate();
  };

  responseGoogle = (response) => {
    let token_id = response.tokenId;
    let user_img = response.profileObj.imageUrl;
    let name = response.profileObj.name;
    let email = response.profileObj.email;

    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("user_img", user_img);
    localStorage.setItem("token", token_id);

    this.setState({
      name,
      email,
      redirect: true,
    });

    this.props.loginValidate();
    // console.log(response.profileObj);
  };

  loginHandler = async () => {
    if (this.state.email === "") {
      this.setState({
        error: "*missing email",
      });
      return "";
    }
    if (this.state.password === "") {
      this.setState({
        error: "*missing password",
      });
      return "";
    }

    this.setState({
      signing_in: true,
    });
    let loginURL = this.props.baseUrl + this.state.loginURL;
    const body = {
      email: this.state.email,
      password: this.state.password,
    };
    // Default options are marked with *

    try {
      const response = await fetch(loginURL, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "omit", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(body), // body data type must match "Content-Type" header
      });

      console.log(response);
      const json = await response.json();

      if (response.status === 200) {
        localStorage.setItem("first_name", json.user.first_name);
        localStorage.setItem("last_name", json.user.last_name);
        localStorage.setItem("token", json.token);
        localStorage.setItem("id", json.user._id);
        localStorage.setItem("email", json.user.email);
        localStorage.setItem("introduction", json.user.introduction);

        this.setState({
          redirect: true,
        });
        window.location = "/";
      }
      if (response.status === 400) {
        let error = "*email or password incorrect. please try again";
        this.setState({ password: "", error, signing_in: false });
      }
      return;
    } catch (error) {
      error = "*email or password incorrect. please try again";
      this.setState({ password: "", error, signing_in: false });
    }
  };
}
