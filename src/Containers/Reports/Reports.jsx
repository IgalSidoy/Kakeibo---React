import React from "react";
import classes from "./Reports.module.css";
import Slider from "../../Components/Slider/Slider";
import DatePicker from "../../Components/DatePicker/DatePicker";
import Loader from "../../Components/Loader/Loader";
import API from "../../API/REST_API";
export default class Reports extends React.Component {
  state = {
    pieChart: {
      options: {
        title: {
          text: "Expenses Breakdown",
          align: "left",
          margin: 2,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: "20px",
            fontWeight: "bold",
            fontFamily: undefined,
            color: "#053a4b",
          },
        },
        chart: {
          id: "basic-bar",
          foreColor: "black",
        },
        labels: ["Income", "Express", "Saving"],
      },
      series: [65, 55, 20],
      width: 300,
      type: "pie",
      title: "",
    },
    radialBar: {
      options: {
        title: {
          text: "Revenue Vs Expense ",
          align: "left",
          margin: 2,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: "20px",
            fontWeight: "bold",
            fontFamily: undefined,
            color: "#053a4b",
          },
        },
        dataLabels: {
          enabled: true,
          enabledOnSeries: undefined,
          formatter: function (val, opts) {
            return val;
          },
          textAnchor: "middle",
          distributed: false,
          offsetX: 0,
          offsetY: 0,
          style: {
            fontSize: "15px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: "bold",
            colors: undefined,
          },

          dropShadow: {
            enabled: false,
            top: 1,
            left: 1,
            blur: 1,
            color: undefined,
            opacity: 0.45,
          },
        },
        chart: {
          foreColor: "#053a4b",
          redrawOnParentResize: true,
        },
        colors: ["#053a4b"],

        plotOptions: {
          bar: {
            horizontal: false,
          },
        },
        labels: [],
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [],
      },
      series: [
        {
          data: [],
        },
      ],
      width: 750,
      type: "bar",
    },
    category: [],
    screen_height: window.innerHeight,
    screen_width: window.innerWidth,
    loading: true,
    settings: {},
  };

  componentDidMount = async () => {
    window.addEventListener("resize", () => {
      let pieChart = JSON.parse(JSON.stringify(this.state.pieChart));
      let radialBar = JSON.parse(JSON.stringify(this.state.radialBar));

      if (this.state.screen_width > 850) {
        pieChart.width = 550;
        radialBar.width = 750;
      } else if (this.state.screen_width > 700) {
        pieChart.width = 500;
        radialBar.width = 500;
      } else if (this.state.screen_width > 500) {
        pieChart.width = 400;
        radialBar.width = 400;
      }
      if (this.state.screen_width < 500) {
        pieChart.width = 350;
        radialBar.width = 350;
      }

      this.setState({
        screen_height: window.innerHeight,
        screen_width: window.innerWidth,
        pieChart,
        radialBar,
      });
    });
    window.addEventListener("scroll", () => {
      let pieChart = JSON.parse(JSON.stringify(this.state.pieChart));
      let radialBar = JSON.parse(JSON.stringify(this.state.radialBar));

      if (this.state.screen_width > 850) {
        pieChart.width = 550;
        radialBar.width = 750;
      } else if (this.state.screen_width > 700) {
        pieChart.width = 500;
        radialBar.width = 500;
      } else if (this.state.screen_width > 500) {
        pieChart.width = 400;
        radialBar.width = 400;
      }
      if (this.state.screen_width < 500) {
        pieChart.width = 350;
        radialBar.width = 350;
      }

      this.setState({
        screen_height: window.innerHeight,
        screen_width: window.innerWidth,
        pieChart,
        radialBar,
      });
    });
    let date = new Date();
    let year = date.getFullYear().toString();
    let month = date.getMonth() + 1;
    if (month < 10) {
      month = "0" + month.toString();
    } else {
      month = month.toString();
    }
    let date_yyyymm = year + month;

    this.LoadData(date_yyyymm);
    await this.loadSettings();
  };
  loadSettings = async () => {
    let settingsURL = this.props.baseUrl + this.props.apiRouts.SETTINGS;
    let settings = await API.Get(settingsURL, this.props.user.token);
    delete settings[0].createdAt;
    delete settings[0].owner;
    delete settings[0].updatedAt;
    delete settings[0].__v;
    delete settings[0]._id;
    settings[0].symbol = settings[0].currency.split("-")[1];
    this.setState({
      settings: settings[0],
    });
  };
  componentWillUnmount() {
    window.removeEventListener("resize", () => {});
    window.removeEventListener("scroll", () => {});
  }
  render() {
    let container_style = { height: this.state.screen_height - 60 };
    let slider = (
      <Slider
        screen_width={this.state.screen_width}
        screen_height={this.state.screen_height}
        screen_2={this.state.radialBar}
        category={this.state.category}
        symbol={this.state.settings.symbol}
      ></Slider>
    );
    if (this.state.loading)
      slider = (
        <div className={classes.loader}>
          <Loader></Loader>
        </div>
      );
    return (
      <div className={classes.container} style={container_style}>
        <div className={classes.row}>
          <div className={classes.date_col}>
            <DatePicker
              top={-500}
              bottom={-10}
              selectDateHandler={this.selectDateHandler}
            ></DatePicker>
          </div>
          <div className={classes.title_col}>
            <div className={classes.title}></div>
          </div>
        </div>

        <div className={classes.row}>
          <div className={classes.col}>{slider}</div>
        </div>
      </div>
    );
  }
  selectDateHandler = async (date) => {
    let yyyymm_arr = date.split("-");
    let yyyymm = yyyymm_arr[1] + yyyymm_arr[0];
    await this.LoadData(yyyymm);
  };

  fetchData = async (yyyymm, type) => {
    // type - const_expense

    let url = this.props.baseUrl + this.props.get_expenses + "?";
    if (yyyymm !== null) url += "&from_date=" + yyyymm;
    if (type !== null) url += "&type=" + type + "&to_date=" + yyyymm;

    try {
      const res = await fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "omit", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.props.user.token,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        //body: JSON.stringify(body), // body data type must match "Content-Type" header
      });
      if (res.status === 200) {
        const expenses = await res.json();
        return expenses;
      }
    } catch (error) {}
  };

  LoadData = async (yyyymm) => {
    this.setState({ loading: true });
    let expenses = await this.fetchData(yyyymm, null);
    let const_expenses = await this.fetchData(yyyymm, "const_expense");

    let totals_series = [0, 0, 0];
    let totals_labels = ["Income", "Expenses", "Delta"];

    let temp_category = [];

    let key = "missing category";
    for (let i in expenses) {
      if (expenses[i].type === "const_expense") continue;
      if (expenses[i].category === "") {
        if (temp_category[key] === undefined) temp_category[key] = 0;
        temp_category[key] += +expenses[i].sum;
      } else {
        if (temp_category[expenses[i].category] === undefined)
          temp_category[expenses[i].category] = 0;
        temp_category[expenses[i].category] += +expenses[i].sum;
      }
      if (expenses[i].type === "income") totals_series[0] += +expenses[i].sum;
      else totals_series[1] += +expenses[i].sum;
      //
    }
    // console.log(temp_category);
    for (let i in const_expenses) {
      if (const_expenses[i].category === "") {
        if (temp_category[key] === undefined) temp_category[key] = 0;
        temp_category[key] += +const_expenses[i].sum;
      } else {
        if (temp_category[const_expenses[i].category] === undefined)
          temp_category[const_expenses[i].category] = 0;
        temp_category[const_expenses[i].category] += const_expenses[i].sum;
      }
      if (const_expenses[i].type === "income")
        totals_series[0] += +const_expenses[i].sum;
      else totals_series[1] += +const_expenses[i].sum;
    }

    //---------------------------init category_details
    let exp_list_by_category = [];
    for (let i in const_expenses) {
      let category = const_expenses[i].category;
      if (const_expenses[i].category === "") category = "missing category";
      exp_list_by_category[category] = [];
    }

    for (let i in expenses) {
      let category = expenses[i].category;
      if (expenses[i].category === "") category = "missing category";
      exp_list_by_category[category] = [];
    }
    //---------------------------------------------end init

    let _exp_id_list = [];
    for (let i in const_expenses) {
      if (_exp_id_list[const_expenses[i]._id] !== undefined) continue;
      let category = const_expenses[i].category;
      if (const_expenses[i].category === "") category = "missing category";
      exp_list_by_category[category].push(const_expenses[i]);
      _exp_id_list[const_expenses[i]._id] = "";
    }

    for (let i in expenses) {
      if (_exp_id_list[expenses[i]._id] !== undefined) continue;

      let category = expenses[i].category;
      if (expenses[i].category === "") category = "missing category";
      exp_list_by_category[category].push(expenses[i]);
      _exp_id_list[expenses[i]._id] = "";
    }
    temp_category = this.sort(temp_category);
    let category = [];
    let pieChart = JSON.parse(JSON.stringify(this.state.pieChart));
    let labels = [];
    let series = [];

    // console.log(this.state.pieChart.series);
    let radialBar = JSON.parse(JSON.stringify(this.state.radialBar));
    // console.log(this.state.barChart);

    for (let i in temp_category) {
      // console.log(exp_list_by_category[temp_category[i]]);
      labels.push(temp_category[i]);
      series.push(+i);
      category.push({
        title: temp_category[i],
        total: i,
        exp_list: exp_list_by_category[temp_category[i]],
      });
    }

    pieChart.options.labels = labels;
    pieChart.series = series;
    //
    totals_series[2] = totals_series[0] - totals_series[1];
    radialBar.series[0] = { data: totals_series };
    radialBar.options.labels = totals_labels;

    if (this.state.screen_width > 850) {
      pieChart.width = 550;
      radialBar.width = 750;
    } else if (this.state.screen_width > 700) {
      pieChart.width = 500;
      radialBar.width = 500;
    } else if (this.state.screen_width > 500) {
      pieChart.width = 400;
      radialBar.width = 400;
    }
    if (this.state.screen_width < 500) {
      pieChart.width = 300;
      radialBar.width = 330;
    }
    this.setState({
      category,
      pieChart,
      radialBar,
      loading: false,
    });
  };
  sort(arr) {
    let result = [];
    for (let i in arr) {
      result[arr[i]] = i;
    }
    return result;
  }
}
