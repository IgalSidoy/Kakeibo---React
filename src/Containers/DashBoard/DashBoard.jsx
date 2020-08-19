import React from "react";
import Row from "../../Components/Grid/Row/Row";
import Col from "../../Components/Grid/Col/Col";
import SideMenu from "../../Components/SideMenu/SideMenu";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Budget from "../Budget/Budget";
import Reports from "../Reports/Reports";
import Home from "../Home/Home";
import Settings from "../Settings/Settings";
import Register from "../Register/Register";
import MenuButton from "../../Components/MenuButton/MenuButton";
import Login from "../Login/Login";
import avatar from "../../img/account_circle-24px.svg";
import classes from "./DashBoard.module.css";

export default class DashBoard extends React.Component {
  state = {
    baseUrl: "https://dry-falls-91776.herokuapp.com",
    baseUrl_DEV: "http://localhost:4500",
    apiRouts: {
      FETCH_BY_DATE: "/api/expense?from_date=",
      FETCH_BY_TYPE: "/api/expense?type=",
      CREATE_NEW_REC: "/api/expense",
      CATEGORIES: "/api/categories",
      LOG_OUT: "/api/user/logout",
      REGISTER: "/api/user",
      GET_PROFILE: "/api/users/me",
      SETTINGS: "/api/settings",
    },
    showMenu: false,
    user: {
      token: "",
      avatar: "",
      first_name: "",
      last_name: "",
      logedIn: false,
      email: "",
      remove_enabled: false,
    },

    category: {
      income: {
        title: "Income",
        path: "/budget/income",
        data: [],
      },
      saving: {
        title: "Saving",
        path: "/budget/saving",
        data: [],
      },
      const_expense: {
        title: "Fixed Expenses",
        path: "/budget/fixedexpenses",
        data: [],
      },
      expense: {
        title: "Expenses",
        path: "/budget/expenses",
        data: [],
      },
    },
  };

  componentDidMount = async () => {
    await this.user_loging_validate_handler();
    let elem = document.getElementsByClassName("dashboard-home");
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari & Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE/Edge */
      elem.msRequestFullscreen();
    }
  };

  logout = async () => {
    let url = this.state.baseUrl + this.state.apiRouts["LOG_OUT"];

    try {
      await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "omit", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.state.user.token,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        //body: JSON.stringify(body), // body data type must match "Content-Type" header
      });
    } catch (error) {}

    localStorage.removeItem("first_name");
    localStorage.removeItem("last_name");
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("introduction");

    let user = JSON.parse(JSON.stringify(this.state.user));
    user.first_name = "";
    user.last_name = "";
    user.logedIn = "";
    user.avatar = avatar;
    user.token = "";

    this.setState({
      user,
    });
  };
  async user_loging_validate_handler() {
    let token = localStorage.getItem("token");
    let email = localStorage.getItem("email");
    let introduction = localStorage.getItem("introduction");
    if (introduction === null) introduction = false;
    let user_fetch = await this.getUserProfileHandler(token);

    let user = {
      token,
      avatar: avatar,
      first_name: "",
      last_name: "",
      email,
      logedIn: false,
    };
    if (user_fetch) {
      user.first_name = user_fetch.first_name;
      user.last_name = user_fetch.last_name;
      user.remove_enabled = user_fetch.remove_enabled;
    }
    if (token !== null) user.logedIn = true;
    this.setState({
      user,
    });
  }

  render() {
    let sideMenu = (
      <Col size={1}>
        <SideMenu
          height="500"
          OnSelectMenu={this.menuButton}
          onLogOutHandler={this.logout}
          google_client_id={this.state.google_client_id}
        ></SideMenu>
      </Col>
    );
    let menuStyle = {};
    if (this.state.showMenu) {
      menuStyle.transform = "translateX(0px)";
      menuStyle.transitionDuration = "0.25s";
      menuStyle.width = "250px";
      menuStyle.position = "absolute";
      menuStyle.zIndex = 10;
    } else {
      menuStyle.transform = "translateX(-280px)";
      menuStyle.transitionDuration = "0.25s";
      menuStyle.width = "0px";
      menuStyle.position = "fixed";
      menuStyle.zIndex = 10;
    }

    let avatar = <img src={this.state.user.avatar} alt=""></img>;

    if (this.state.user.last_name && this.state.user.first_name) {
      avatar = (
        <div className={classes.avatar_name}>
          <div className={classes.avatar_container}>
            <label>
              {this.state.user.first_name.substr(0, 1) +
                this.state.user.last_name.substr(0, 1)}
            </label>
          </div>
        </div>
      );
    }
    return (
      <div className="dashboard-home">
        <Router>
          <div className={classes.header_container}>
            <Row>
              <Col size={1} max={60}>
                <div className={classes.border_right1}>
                  <MenuButton onClick={this.menuButton}></MenuButton>
                </div>
              </Col>
              <Col size={2}>
                <div className={classes.title}></div>
              </Col>
              <Col size={1} max={70}>
                <Link to="/settings">
                  <div className={classes.avatar}>{avatar}</div>
                </Link>
              </Col>
            </Row>
          </div>
          <div onClick={() => this.menuButton(false)}>
            <Row>
              <div style={menuStyle}>{sideMenu}</div>
              <Col size={5}>
                <Route path="/login">
                  <Login
                    baseUrl={this.state.baseUrl}
                    loginValidate={this.user_loging_validate_handler}
                    user={this.state.user}
                  ></Login>
                </Route>
                <Route path="/register">
                  <Register
                    register_url={this.state.apiRouts.REGISTER}
                    baseUrl={this.state.baseUrl}
                  ></Register>
                </Route>
                <this.PrivateRoute path="/budget">
                  <Budget
                    apiRouts={this.state.apiRouts}
                    baseUrl={this.state.baseUrl}
                    user={this.state.user}
                  ></Budget>
                </this.PrivateRoute>

                <this.PrivateRoute path="/settings">
                  <Settings
                    get_profile={this.state.apiRouts.GET_PROFILE}
                    apiRouts={this.state.apiRouts}
                    update_profile_url={this.state.apiRouts.REGISTER}
                    baseUrl={this.state.baseUrl}
                    user={this.state.user}
                    update_remove_enabled={this.update_remove_enabled}
                  ></Settings>
                </this.PrivateRoute>

                <this.PrivateRoute path="/reports">
                  <Reports
                    user={this.state.user}
                    get_expenses={this.state.apiRouts.CREATE_NEW_REC}
                    baseUrl={this.state.baseUrl}
                    apiRouts={this.state.apiRouts}
                  ></Reports>
                </this.PrivateRoute>

                <Route exact path="/home">
                  <Home
                    loginValidate={this.user_loging_validate_handler}
                  ></Home>
                </Route>
                <Route exact path="/">
                  <Home></Home>
                </Route>
                {/* <Redirect from="/" to="/home" /> */}
              </Col>
            </Row>
          </div>
        </Router>
      </div>
    );
  }
  menuButton = (isOn) => {
    this.setState({
      showMenu: isOn === false ? false : !this.state.showMenu,
    });
  };
  PrivateRoute = ({ children, ...rest }) => {
    if (this.state.user.logedIn) {
      return <Route {...rest} render={({ location }) => children}></Route>;
    } else {
      return (
        <Route
          {...rest}
          render={({ location }) => (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          )}
        ></Route>
      );
    }
  };

  getUserProfileHandler = async (token) => {
    const updateURL = this.state.baseUrl + this.state.apiRouts.GET_PROFILE;
    try {
      const response = await fetch(updateURL, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "omit", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        // body: JSON.stringify(body), // body data type must match "Content-Type" header
      });
      if (response.status === 200) {
        return await response.json();
      }

      if (response.status === 400) {
        throw new Error("something went wrong , please try again later");
      }
    } catch (error) {}
  };

  update_remove_enabled = async (remove_enabled) => {
    // console.log(this.state.user);

    const updateURL = this.state.baseUrl + this.state.apiRouts.REGISTER;
    // console.log(updateURL);

    const body = {
      remove_enabled,
    };

    try {
      const response = await fetch(updateURL, {
        method: "PATCH", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "omit", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.state.user.token,
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(body), // body data type must match "Content-Type" header
      });

      if (response.status === 200) {
        const json = await response.json();

        let user = JSON.parse(JSON.stringify(this.state.user));
        user.remove_enabled = json.remove_enabled;

        this.setState({ user });
      }

      if (response.status === 400) {
        throw new Error("something went wrong , please try again later");
      }
    } catch (error) {
      this.setState({
        personal_details_error: "*" + error,
        personal_update: false,
      });
    }
  };
}
