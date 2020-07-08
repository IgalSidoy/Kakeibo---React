import React, { Component } from "react";
import Loader from "../../Components/Loader/Loader";
import classes from "./Settings.module.css";

import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import InputSelect from "../../Components/InputSelect/InputSelect";
import remove from "../../img/remove_circle_outline-24px.svg";

export default class extends Component {
  state = {
    loading: true,
    countries: [],
    personal_details_error: "",
    user: this.props.user,
    genderList: [
      {
        value: "male",
        label: "Male",
      },
      {
        value: "female",
        label: "Female",
      },
    ],
    messageBox: {
      show: false,
      msg: "somthing",
    },
    personal_update: false,
    categories: [],
    category: "",
    new_category: "",
    new_category_error: false,
    new_category_error_msg: "",
    add_category: false,
    add_category_error: "",
    delete_category: false,
  };

  show_hide_message_box(show, msg) {
    this.setState({
      messageBox: { show, msg },
    });
  }

  async updateUserHandlers() {
    const updateURL = this.props.baseUrl + this.props.update_profile_url;

    const body = {
      first_name: this.state.user.first_name,
      last_name: this.state.user.last_name,
      countery: this.state.user.countery,
      mobile: this.state.user.mobile,
      gender: this.state.user.gender,
    };
    this.setState({ personal_update: true });

    try {
      const response = await fetch(updateURL, {
        method: "PATCH", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "omit", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.props.user.token,
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(body), // body data type must match "Content-Type" header
      });

      if (response.status === 200) {
        const json = await response.json();
        // console.log(json);
        localStorage.setItem("first_name", json.first_name);
        localStorage.setItem("last_name", json.last_name);
        this.setStateAsync({ personal_update: true });

        this.setState({
          messageBox: {
            show: true,
            msg: "successfully updated",
          },
          personal_update: false,
        });
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
  }
  async getAllCountries() {
    const url = "https://restcountries.eu/rest/v2/all";
    const res = await fetch(url);
    const res_json = await res.json();
    let countries = [];
    for (let index in res_json) {
      countries.push({
        value: res_json[index].name,
        label: res_json[index].name,
      });
    }
    this.setState({
      countries,
    });
  }
  async getAllCategories() {
    const updateURL = this.props.baseUrl + this.props.apiRouts.CATEGORIES;
    try {
      const response = await fetch(updateURL, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "omit", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.props.user.token,
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        // body: JSON.stringify(body), // body data type must match "Content-Type" header
      });

      if (response.status === 200) {
        const json = await response.json();
        let categories = [];

        for (let index in json) {
          categories.push({
            label: json[index].title,
            value: json[index]._id,
          });
        }
        this.setState({ categories });
      }
    } catch (error) {}
  }

  async loadUserProfile() {
    const getProfileURL = this.props.baseUrl + this.props.get_profile;
    try {
      const response = await fetch(getProfileURL, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "omit", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.props.user.token,
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      });

      //   console.log(response.status);
      if (response.status === 401) {
      }
      if (response.status === 200) {
        const json = await response.json();
        // console.log(json);
        this.setState({ user: json, loading: false });
        // console.log(json);
      }
    } catch (error) {
      //   console.log("error:", error);
    }
  }
  async componentDidMount() {
    await this.getAllCountries();
    await this.getAllCategories();
    await this.loadUserProfile();

    window.addEventListener("keydown", (e) => {
      if (e.keyCode === 13 && this.state.messageBox.show) {
        this.setState({
          messageBox: { show: false, msg: "" },
        });
      }
    });
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", () => {});
  }
  onChange(type, value) {
    let user = JSON.parse(JSON.stringify(this.state.user));
    if (type === "gender") {
      user.gender = value;
      this.setState({
        user,
      });
      return;
    }
    if (type === "countery") {
      user.countery = value;

      this.setState({ user });
      return;
    }

    if (type === "lastName") {
      user.last_name = value;
      this.setState({ user });
      return;
    }

    if (type === "firstName") {
      user.first_name = value;
      this.setState({ user });
      return;
    }

    if (type === "mobile") {
      user.mobile = value;
      this.setState({ user });
      return;
    }
    if (type === "category") {
      let name = "";
      for (let i in this.state.categories) {
        if (this.state.categories[i].value === value) {
          name = this.state.categories[i].label;
          break;
        }
      }
      this.setState({ category: value, new_category: name });
      return;
    }
    if (type === "new_category") {
      this.setState({ new_category: value });
      return;
    }

    //
  }
  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }
  async addNewCategoryHandler() {
    if (this.state.new_category === "") {
      this.setState({
        messageBox: {
          show: true,
          msg: "new category can't be empty",
        },
      });
      return;
    }

    if (this.checkCategoryExist()) return;

    let updateURL = this.props.baseUrl + this.props.apiRouts.CATEGORIES;

    const body = {
      title: this.state.new_category,
    };
    this.setState({ add_category: true });

    let method = "POST";
    if (this.state.new_category !== "" && this.state.category !== "") {
      updateURL += "/" + this.state.category;
      method = "PATCH";
    }
    try {
      const response = await fetch(updateURL, {
        method: method, // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "omit", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.props.user.token,
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(body), // body data type must match "Content-Type" header
      });

      if (response.status === 201) {
        const json = await response.json();
        this.setStateAsync({ add_category: false });

        let categories = JSON.parse(JSON.stringify(this.state.categories));
        categories.push({
          label: json.title,
          value: json._id,
        });

        this.setState({
          messageBox: {
            show: true,
            msg: "new category added",
          },
          add_category: false,
          new_category: "",
          categories,
        });
      }

      if (response.status === 200) {
        const json = await response.json();
        this.setStateAsync({ add_category: false });

        let categories = JSON.parse(JSON.stringify(this.state.categories));
        for (let i in categories) {
          if (categories[i].value === this.state.category) {
            categories[i].label = json.title;
            break;
          }
        }

        this.setState({
          messageBox: {
            show: true,
            msg: "Successfully updated",
          },
          add_category: false,
          new_category: "",
          category: "",
          categories,
        });
      }

      if (response.status === 400) {
        throw new Error("something went wrong , please try again later");
      }
    } catch (error) {
      this.setState({
        add_category_error: "*" + error,
        add_category: false,
      });
    }
  }

  async deleteCategoryHandler() {
    const updateURL =
      this.props.baseUrl +
      this.props.apiRouts.CATEGORIES +
      "/" +
      this.state.category;

    if (this.state.category === "") {
      this.setState({
        messageBox: {
          show: true,
          msg: "Category not selected",
        },
      });
      return;
    }
    this.setState({
      delete_category: true,
    });
    try {
      const response = await fetch(updateURL, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "omit", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.props.user.token,
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        // body: JSON.stringify(body), // body data type must match "Content-Type" header
      });

      if (response.status === 202) {
        let categories = JSON.parse(JSON.stringify(this.state.categories));

        for (let i in categories) {
          if (categories[i].value === this.state.category) {
            categories.splice(i, 1);
            break;
          }
        }

        this.setState({
          messageBox: {
            show: true,
            msg: "Successfully Deleted",
          },
          category: "",
          categories,
          new_category: "",
          delete_category: false,
          new_category_error: false,
          new_category_error_msg: "",
        });
      }

      if (response.status === 400) {
        throw new Error("something went wrong , please try again later");
      }
    } catch (error) {
      this.setState({
        add_category_error: "*" + error,
        add_category: false,
        delete_category: false,
      });
    }
  }

  checkCategoryExist() {
    for (let i in this.state.categories) {
      if (this.state.categories[i].label === this.state.new_category) {
        this.setState({
          new_category_error: true,
          new_category_error_msg: "category exist.",
        });
        return true;
      }
      if (this.state.new_category_error) {
        this.setState({
          new_category_error: false,
          new_category_error_msg: "",
        });
      }
    }
    return false;
  }
  render() {
    if (this.state.loading) return <Loader></Loader>;
    let messgae_box = classes.message_show;
    if (!this.state.messageBox.show) messgae_box = classes.message_hide;

    let personal_update_btn = (
      <div className={classes.loader}>
        <Loader></Loader>
      </div>
    );

    if (!this.state.personal_update)
      personal_update_btn = <label>update</label>;

    //----------------------

    let add_category_btn = (
      <div className={classes.loader}>
        <Loader></Loader>
      </div>
    );

    if (!this.state.add_category) add_category_btn = <label>add/edit</label>;

    let delete_category_btn = <img src={remove} alt=""></img>;
    if (this.state.delete_category)
      delete_category_btn = (
        <div className={classes.loader_small}>
          <Loader></Loader>
        </div>
      );
    return (
      <div
        id="setting_container"
        className={classes.container}
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            if (this.state.messageBox.show === true) {
              this.setState({
                messageBox: {
                  show: false,
                  msg: "",
                },
              });
            }
          }
        }}
      >
        <div className={messgae_box}>
          <div className={classes.msg}>
            <label>{this.state.messageBox.msg}</label>
          </div>
          <div
            className={classes.button}
            onClick={() => this.show_hide_message_box(false, "")}
          >
            <label>OK</label>
          </div>
        </div>
        <div className={classes.row}>
          <div className={classes.col + " " + classes.border}>
            <div className={classes.row + " " + classes.cell_title}>
              <div className={classes.col}>
                <label>Personal Details</label>
              </div>
            </div>

            <div className={classes.row}>
              <div className={classes.col}>
                <TextField
                  disabled={true}
                  label="Email"
                  variant="outlined"
                  fullWidth={true}
                  value={this.state.user.email}
                  onChange={(e) => {
                    this.onChange("email", e.target.value);
                  }}
                ></TextField>
              </div>
            </div>
            <div className={classes.row}>
              <div className={classes.col}>
                <TextField
                  label="FirstName"
                  variant="outlined"
                  fullWidth={true}
                  value={this.state.user.first_name}
                  onChange={(e) => {
                    this.onChange("firstName", e.target.value);
                  }}
                ></TextField>
              </div>
            </div>

            <div className={classes.row}>
              <div className={classes.col}>
                <TextField
                  label="LastName"
                  variant="outlined"
                  fullWidth={true}
                  value={this.state.user.last_name}
                  onChange={(e) => {
                    this.onChange("lastName", e.target.value);
                  }}
                ></TextField>
              </div>
            </div>

            <div className={classes.row}>
              <div className={classes.col}>
                <TextField
                  id="gender"
                  select
                  label="Gender"
                  variant="outlined"
                  fullWidth={true}
                  value={this.state.user.gender}
                  onChange={(e) => this.onChange("gender", e.target.value)}
                >
                  {this.state.genderList.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
            <div className={classes.row}>
              <div className={classes.col}>
                <TextField
                  id="counteries"
                  select
                  type="text"
                  label="Countery"
                  variant="outlined"
                  fullWidth={true}
                  value={this.state.user.countery}
                  onChange={(e) => {
                    this.onChange("countery", e.target.value);
                  }}
                >
                  {this.state.countries.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
            <div className={classes.row}>
              <div className={classes.col}>
                <TextField
                  label="Moblie"
                  variant="outlined"
                  fullWidth={true}
                  value={this.state.user.mobile}
                  onChange={(e) => {
                    this.onChange("mobile", e.target.value);
                  }}
                ></TextField>
              </div>
            </div>

            <div className={classes.row}>
              <div className={classes.col + " " + classes.error}>
                {this.state.personal_details_error}
              </div>
            </div>

            <div className={classes.row}>
              <div className={classes.col}>
                <div
                  className={classes.button}
                  onClick={() => this.updateUserHandlers()}
                >
                  {personal_update_btn}
                </div>
              </div>
            </div>
          </div>

          <div className={classes.col + " " + classes.border}>
            <div className={classes.row + " " + classes.cell_title}>
              <div className={classes.col}>
                <label>Categories Setup</label>
              </div>
            </div>
            <div className={classes.row}>
              <div className={classes.col}>
                <InputSelect
                  value={this.state.category}
                  isSelect={true}
                  label={"category"}
                  dataSet={this.state.categories}
                  onChange={(e) => {
                    this.onChange("category", e.target.value);
                  }}
                ></InputSelect>
              </div>
              <div
                className={classes.remove_img}
                onClick={() => {
                  this.deleteCategoryHandler();
                }}
              >
                {delete_category_btn}
              </div>
            </div>
            <div className={classes.row}>
              <div className={classes.col}>
                <InputSelect
                  helperText={this.state.new_category_error_msg}
                  error={this.state.new_category_error}
                  value={this.state.new_category}
                  isSelect={false}
                  label={"new category"}
                  onChange={(e) => {
                    this.onChange("new_category", e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      this.addNewCategoryHandler();
                    }
                  }}
                ></InputSelect>
              </div>
            </div>
            <div className={classes.row}>
              <div className={classes.col + " " + classes.error}>
                {this.state.add_category_error}
              </div>
            </div>
            <div className={classes.row}>
              <div className={classes.col}>
                <div
                  className={classes.button}
                  onClick={() => this.addNewCategoryHandler()}
                >
                  {add_category_btn}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
