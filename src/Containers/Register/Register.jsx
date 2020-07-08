import React, { useState, useEffect } from "react";

import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { Redirect } from "react-router-dom";
import classes from "./Register.module.css";
import Loader from "../../Components/Loader/Loader";
export default (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const [gender, setGender] = useState("");
  const genderList = [
    {
      value: "male",
      label: "Male",
    },
    {
      value: "female",
      label: "Female",
    },
  ];
  const [countery, setCountery] = useState("");
  let [countries, setCountries] = useState([]);
  const [moblie, setMoblie] = useState("");
  const [passsword, setPasssword] = useState("");
  const [rePasssword, setRePasssword] = useState("");
  const [error, setError] = useState("");
  const [registerClick, setRegisterClick] = useState(false);

  const [redirect, setRedirect] = useState(false);

  const validate = () => {
    if (firstName === "") {
      setError("* FirstName is required.");
      return false;
    }
    if (lastName === "") {
      setError("* LastName is required.");
      return false;
    }
    if (email === "") {
      setError("* Email is required.");
      return false;
    }
    if (passsword === "" || rePasssword === "") {
      setError("* Password is required.");
      return false;
    }
    if (passsword !== rePasssword) {
      setError("* The specified password do not match.");
      return false;
    }
    return true;
  };

  const register = async () => {
    if (!validate()) {
      return;
    }
    setRegisterClick(true);
    let registerURL = props.baseUrl + props.register_url;

    const body = {
      email: email,
      password: passsword,
      first_name: firstName,
      last_name: lastName,
      gender: gender,
      birth_date: birthDate,
      countery: countery,
      mobile: moblie,
      introduction: true,
    };
    try {
      const response = await fetch(registerURL, {
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

      const json = await response.json();

      console.log("response:", json);
      if (response.status === 201) {
        console.log(json);
        localStorage.setItem("token", json.token);
        localStorage.setItem("email", json.user.email);
        localStorage.setItem("introduction", json.user.introduction);
        //setRegisterClick(false);
        window.location = "/";
        // setRedirect(true);
      }
      if (response.status === 400) {
        setError("*" + json.error);
        setRegisterClick(false);
      }
      return;
    } catch (error) {
      setError(error);
      setRegisterClick(false);
    }
  };
  const getAllCountries = async () => {
    const url = "https://restcountries.eu/rest/v2/all";

    const res = await fetch(url);
    const res_json = await res.json();
    let countries_t = [];
    for (let index in res_json) {
      countries_t.push({
        value: res_json[index].name,
        label: res_json[index].name,
      });
    }
    setCountries(countries_t);
  };

  useEffect(() => {
    getAllCountries();
  }, []);

  let register_buttun = <label>Create Account</label>;

  if (registerClick) {
    register_buttun = (
      <div className={classes.loader}>
        <Loader></Loader>
      </div>
    );
  }

  return redirect ? (
    <Redirect to="/settings"></Redirect>
  ) : (
    <div className={classes.container}>
      <div className={classes.title}>
        <label>Register</label>
      </div>

      <div className={classes.rowLine}>
        <div className={classes.col_input}>
          <TextField
            required={true}
            type="text"
            label="First Name"
            variant="outlined"
            value={firstName}
            autoFocus={true}
            fullWidth={true}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </div>
        <div className={classes.col_input}>
          <TextField
            required={true}
            type="text"
            label="Last Name"
            variant="outlined"
            value={lastName}
            fullWidth={true}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </div>
        <div className={classes.col_input}>
          <TextField
            required={true}
            type="email"
            label="email"
            value={email}
            variant="outlined"
            fullWidth={true}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className={classes.col_input + " " + classes.visibale_non}>
          <TextField
            id="gender"
            select
            label="Gender"
            variant="outlined"
            fullWidth={true}
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            {genderList.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className={classes.col_input + " " + classes.visibale_non}>
          <TextField
            type="date"
            label="Birth Date"
            variant="outlined"
            value={birthDate}
            fullWidth={true}
            onChange={(e) => {
              setBirthDate(e.target.value);
            }}
          />
        </div>
        <div className={classes.col_input + " " + classes.visibale_non}>
          <TextField
            id="counteries"
            select
            type="text"
            label="Countery"
            variant="outlined"
            fullWidth={true}
            value={countery}
            onChange={(e) => {
              setCountery(e.target.value);
            }}
          >
            {countries.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className={classes.col_input + " " + classes.visibale_non}>
          <TextField
            type="mobile"
            label="Mobile"
            value={moblie}
            variant="outlined"
            fullWidth={true}
            onChange={(e) => {
              setMoblie(e.target.value);
            }}
          />
        </div>
        <div className={classes.col_input}>
          <TextField
            required={true}
            type="text"
            label="Password"
            value={passsword}
            variant="outlined"
            fullWidth={true}
            onChange={(e) => {
              setPasssword(e.target.value);
            }}
          />
        </div>
        <div className={classes.col_input}>
          <TextField
            required={true}
            type="text"
            label="Confirm Password"
            value={rePasssword}
            variant="outlined"
            fullWidth={true}
            onChange={(e) => {
              setRePasssword(e.target.value);
            }}
          />
        </div>
        <div className={classes.col_input + " " + classes.error}>
          <label>{error}</label>
        </div>

        <div className={classes.col}>
          <div
            className={classes.button}
            onClick={() => {
              register();
            }}
          >
            {register_buttun}
          </div>
        </div>
      </div>
    </div>
  );
};
