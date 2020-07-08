import React from "react";
import classes from "./Budget.module.css";
import Header from "./BudgetHeader/BudgetHeader";
import Menu from "./Menu/Menu";
import TableInput from "./TableInput/TableInput";
import Chart from "../../Components/Charts/Chart/Chart";
import Loader from "../../Components/Loader/Loader";
import { Route } from "react-router-dom";
export default class Budget extends React.Component {
  state = {
    date: "",
    screeWidth: 0,
    header_title: "",
    category_height: 300,
    subCategory: [],
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
    pieChart: {
      options: {
        chart: {
          id: "basic-bar",
        },
        labels: [
          "Income",
          "Saving",
          "Fixed Expenses",
          "Expenses",
          "Free Budget",
        ],
      },
      series: [10, 10, 10, 10],
      width: 350,
      type: "pie",
      title: "",
    },
    loaded: false,
    const_expence_update: false,
  };

  resize() {
    let pieChart = JSON.parse(JSON.stringify(this.state.pieChart));

    if (window.innerWidth < 850) {
      pieChart.width = 300;
      this.setState({
        screeWidth: window.innerWidth,
        pieChart,
      });
    } else {
      let width = window.innerWidth / 3;
      if (width > 400) width = 400;
      if (width < 280) width = 280;
      pieChart.width = width;

      this.setState({
        screeWidth: window.innerWidth,
        pieChart,
      });
    }
  }

  componentDidMount() {
    this.resize();
    window.addEventListener("resize", () => {
      this.resize();
    });

    let date = new Date().toISOString().split("-");
    date = date[1] + "-" + date[0];
    this.setState({
      date,
    });
    this.selectDateHandler(date);
    this.load_categories();
  }

  render() {
    let sub_menus = (
      <React.Fragment>
        <Route path={this.state.category.income.path}>
          <TableInput
            title={"Income"}
            data={this.state.category.income.data}
            onChange={this.onChange}
            screeWidth={this.state.screeWidth}
            delete_rec_by_id={this.delete_rec_by_id}
            categories={this.state.subCategory}
          ></TableInput>
        </Route>
        <Route path={this.state.category.saving.path}>
          <TableInput
            title={"Saving"}
            data={this.state.category.saving.data}
            onChange={this.onChange}
            screeWidth={this.state.screeWidth}
            delete_rec_by_id={this.delete_rec_by_id}
            categories={this.state.subCategory}
          ></TableInput>
        </Route>
        <Route path={this.state.category.const_expense.path}>
          <TableInput
            title={"Fixed Expenses"}
            data={this.state.category.const_expense.data}
            onChange={this.onChange}
            screeWidth={this.state.screeWidth}
            delete_rec_by_id={this.delete_rec_by_id}
            categories={this.state.subCategory}
          ></TableInput>
        </Route>
        <Route path={this.state.category.expense.path}>
          <TableInput
            title={"Expenses"}
            categories={this.state.subCategory}
            data={this.state.category.expense.data}
            onChange={this.onChange}
            screeWidth={this.state.screeWidth}
            delete_rec_by_id={this.delete_rec_by_id}
          ></TableInput>
        </Route>
      </React.Fragment>
    );
    if (!this.state.loaded)
      sub_menus = (
        <div className={classes.loader}>
          <Loader></Loader>
        </div>
      );

    return (
      <div>
        <Header
          title={this.state.header_title}
          selectDateHandler={this.selectDateHandler}
        ></Header>

        <div className={classes.row}>
          <div className={classes.col_menu}>
            <div className={classes.menu}>
              <Menu data={this.state.category}></Menu>
            </div>
          </div>
          <div className={classes.col}>
            <div className={classes.row}>
              <div className={classes.container_col}>{sub_menus}</div>

              <div className={classes.chart_col}>
                <Chart data={this.state.pieChart}></Chart>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  onChange = async (
    categoryName,
    index,
    type,
    value,
    id,
    from_date,
    to_date,
    updated
  ) => {
    value = value.value;

    let category = JSON.parse(JSON.stringify(this.state.category));

    if (type === "sum" && isNaN(+value)) return;

    if (type === "payments" && isNaN(+value)) return;
    if (type === "payments" && value === "") value = 0;

    let cat_Name = 0;
    for (let i in category) {
      if (category[i].title === categoryName) {
        cat_Name = i;
        break;
      }
    }
    if (index === "add") {
      const record = await this.Insert_new_Record_handler(
        cat_Name,
        this.state.date
      );
      let id = record._id;
      delete record.owner;
      delete record.updatedAt;
      delete record.createdAt;
      delete record._id;
      record.id = id;
      if (cat_Name === "const_expense") record.payments = 0;
      category[cat_Name].data.push(record);
    } else {
      let body = {};
      //updae

      if (cat_Name === "const_expense") {
        if (
          await this.split_expense(
            cat_Name,
            index,
            this.state.date,
            id,
            type,
            value
          )
        ) {
          return;
        } else {
          if (this.state.const_expence_update) return;
        }
      }

      if (type === "title") {
        category[cat_Name].data[index].title = value;
        body.title = value;
        this.update_rec_by_id(id, body);
      }
      if (type === "sum") {
        body.sum = +value;
        category[cat_Name].data[index].sum = +value;
        this.update_rec_by_id(id, body);
      }
      if (type === "category") {
        body.category = value;
        category[cat_Name].data[index].category = value;
        this.update_rec_by_id(id, body);
      }

      if (type === "payments") {
        //body.category = value;
        let date_split = this.state.date.split("-");
        let date = date_split[1] + date_split[0];

        category[cat_Name].data[index].payments = +value;

        if (category[cat_Name].data[index].from_date === +date && +value > 0) {
          let from_date = category[cat_Name].data[index].from_date.toString();
          let year = +from_date.slice(0, 4);
          let month = +from_date.slice(4, 6);
          let months_count = month + +value;
          let to_date = this.getNextDate(year, month, months_count);
          body.to_date = to_date;
          this.update_rec_by_id(id, body);
        }
        //
      }
      //
    }
    this.renderChart(this.updateCategoryHandler(category));
  };
  getNextDate(year, month, months) {
    // console.clear();
    let reuslt_month = month;
    let result = "";
    // console.log(year, month, months);
    for (let i = 0; i < months - month; i++) {
      reuslt_month++;
      console.log(reuslt_month);
      if (reuslt_month > 12) {
        reuslt_month = 1;
        year++;
      }
    }
    if (reuslt_month < 10)
      result = year.toString() + "0" + reuslt_month.toString();
    else result = year.toString() + reuslt_month.toString();

    return result;
  }

  updateCategoryHandler = (category) => {
    let series = [0, 0, 0, 0];
    let tabal = [];
    tabal["income"] = 0;
    tabal["saving"] = 1;
    tabal["const_expense"] = 2;
    tabal["expense"] = 3;

    for (let c in category) {
      for (let index in category[c].data) {
        series[tabal[c]] += +category[c].data[index].sum;
      }
    }
    series[4] = series[0] - series[1] - series[2] - series[3];
    this.setState({ category });
    return series;
  };
  renderChart = (series) => {
    let pieChart = JSON.parse(JSON.stringify(this.state.pieChart));
    pieChart.series = series;
    this.setState({
      pieChart,
    });
  };
  //loads data by date and updates date
  selectDateHandler = async (date) => {
    let yyyymm_arr = date.split("-");
    let yyyymm = yyyymm_arr[1] + yyyymm_arr[0];
    const url =
      this.props.baseUrl +
      this.props.apiRouts.FETCH_BY_DATE +
      yyyymm +
      "&to_date=" +
      yyyymm;
    this.setState({
      loaded: false,
    });
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
        let category = JSON.parse(JSON.stringify(this.state.category));
        category.income.data = new Array(0);
        category.saving.data = new Array(0);
        category.const_expense.data = new Array(0);
        category.expense.data = new Array(0);
        for (let exp in expenses) {
          if (expenses[exp].type === "income") {
            category.income.data.push({
              sum: expenses[exp].sum,
              title: expenses[exp].title,
              id: expenses[exp]._id,
              category: expenses[exp].category,
              recored_updated: expenses[exp].updatedAt,
            });
            continue;
          }
          if (expenses[exp].type === "saving") {
            category.saving.data.push({
              sum: expenses[exp].sum,
              title: expenses[exp].title,
              id: expenses[exp]._id,
              category: expenses[exp].category,
              recored_updated: expenses[exp].updatedAt,
            });
            continue;
          }

          if (expenses[exp].type === "expense") {
            category.expense.data.push({
              sum: expenses[exp].sum,
              title: expenses[exp].title,
              id: expenses[exp]._id,
              category: expenses[exp].category,
              recored_updated: expenses[exp].updatedAt,
            });
            continue;
          }
        }

        const const_expenses = await this.fetchGet(
          url + "&type=const_expense",
          this.props.user.token
        );
        for (let exp in const_expenses) {
          let ex = {
            sum: const_expenses[exp].sum,
            title: const_expenses[exp].title,
            id: const_expenses[exp]._id,
            from_date: const_expenses[exp].from_date,
            to_date: const_expenses[exp].to_date,
            category: const_expenses[exp].category,
            updated: const_expenses[exp].updated,
            recored_updated: const_expenses[exp].updatedAt,
          };
          if (ex.to_date === 999999) ex.payments = 0;
          else {
            let years =
              +const_expenses[exp].to_date.toString().slice(0, 4) -
              +yyyymm_arr[1];
            let months =
              +const_expenses[exp].to_date.toString().slice(4, 6) -
              +yyyymm_arr[0];
            ex.payments = years * 12 + months;
          }
          category.const_expense.data.push(ex);
        }
        this.renderChart(this.updateCategoryHandler(category));
        this.setState({ date, loaded: true });
      }
    } catch (error) {}
  };
  Insert_new_Record_handler = async (type, date, _body) => {
    // console.log(type, date);
    const url = this.props.baseUrl + this.props.apiRouts.CREATE_NEW_REC;

    let new_date = date.split("-");

    let body = {};
    if (_body === undefined) {
      body = {
        type: type,
        title: "",
        category: "",
        sum: 0,
        from_date: new_date[1] + new_date[0],
        to_date: new_date[1] + new_date[0],
        updated: false,
      };
    }

    if (type === "const_expense") {
      body.to_date = 999999;
    }
    if (_body !== undefined) body = _body;
    try {
      const res = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
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
        body: JSON.stringify(body), // body data type must match "Content-Type" header
      });
      if (res.status === 201) {
        const json = await res.json();
        return json;
      }
    } catch (error) {
      console.log(error);
    }
  };
  update_rec_by_id = async (id, body) => {
    // console.log("update_rec_by_id:", id, body);

    const url =
      this.props.baseUrl + this.props.apiRouts.CREATE_NEW_REC + "/" + id;
    try {
      await fetch(url, {
        method: "PATCH", // *GET, POST, PUT, DELETE, etc.
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
        body: JSON.stringify(body), // body data type must match "Content-Type" header
      });
    } catch (error) {}
  };
  delete_rec_by_id = async (categoryName, id) => {
    // console.log(categoryName, id);
    let category = JSON.parse(JSON.stringify(this.state.category));
    let cat_Name = 0;
    for (let i in category) {
      if (category[i].title === categoryName) {
        cat_Name = i;
        break;
      }
    }
    // console.log("cat_Name", cat_Name);
    // console.log("id:", id);

    let delete_index = 0;
    for (let i in category[cat_Name].data) {
      if (category[cat_Name].data[i].id === id) {
        delete_index = i;
        break;
      }
    }
    let to_delete = true;
    if (cat_Name === "const_expense") {
      let temp_date = this.state.date.split("-");
      let date = temp_date[1] + temp_date[0];

      // console.log("date", date);
      // console.log("from_date", category[cat_Name].data[delete_index].from_date);
      if (date > category[cat_Name].data[delete_index].from_date)
        to_delete = false;

      let body_update = {};
      if (+temp_date[0] > 1) {
        body_update = { to_date: date - 1 };
      }
      if (+temp_date[0] === 1) {
        body_update = { to_date: temp_date[1] - 1 + "12" };
      }
      // console.log(body_update);
      await this.update_rec_by_id(id, body_update);
    }

    category[cat_Name].data.splice(delete_index, 1);
    this.renderChart(this.updateCategoryHandler(category));
    this.setState({
      category,
    });
    if (!to_delete) return;
    const url =
      this.props.baseUrl + this.props.apiRouts.CREATE_NEW_REC + "/" + id;
    try {
      await fetch(url, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
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
    } catch (error) {}
  };
  load_categories = async () => {
    const url = this.props.baseUrl + this.props.apiRouts.CATEGORIES;
    this.setState({
      loaded: false,
    });
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

        let subCategory = [];

        for (let index in expenses) {
          subCategory.push({
            label: expenses[index].title,
            value: expenses[index].title,
          });
        }
        this.setState({
          subCategory,
        });
      }
    } catch (error) {
      this.setState({
        subCategory: [],
      });
    }
  };
  fetchGet = async (url, token) => {
    try {
      const res = await fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "omit", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        // body: JSON.stringify(_body), // body data type must match "Content-Type" header
      });
      return await res.json();
    } catch (e) {
      return e;
    }
  };
  split_expense = async (type, index, date, id, prop, value) => {
    // console.log(this.state.const_expence_update);
    let temp_date = date.split("-");
    date = temp_date[1] + temp_date[0];

    if (this.state.const_expence_update) return false;

    let category = JSON.parse(JSON.stringify(this.state.category));

    let exp = category[type].data[index];
    // console.log(exp);

    //console.log(type, index, date, id, prop, value);

    if (+exp.from_date !== +date) {
      this.setState({ const_expence_update: true });
      // console.log("no equals");
      let body_update = {};
      if (+temp_date[0] > 1) {
        body_update = { to_date: date - 1 };
      }
      if (+temp_date[0] === 1) {
        body_update = { to_date: temp_date[1] - 1 + "12" };
      }

      await this.update_rec_by_id(id, body_update);
      category[type].data.splice(index, 1);

      delete exp.id;
      exp.from_date = date;
      exp.type = type;

      if (prop === "title") exp.title = value;
      if (prop === "sum") exp.sum = value;
      if (prop === "category") exp.category = value;

      let new_exp = await this.Insert_new_Record_handler(type, date, exp);
      new_exp.id = new_exp._id;
      delete new_exp._id;
      new_exp.payments = 0;
      // console.log("new_exp:", new_exp);
      // category[type].data.push(new_exp);
      category[type].data.splice(index, 0, new_exp);
      this.renderChart(this.updateCategoryHandler(category));
      this.setState({ const_expence_update: false });
      return true;
    }

    return false;
  };

  debounce(millSec, func) {
    let interval;
    setTimeout(() => {
      // console.log("debounce");
      clearTimeout(interval);
      return func();
    }, millSec);
  }
}
