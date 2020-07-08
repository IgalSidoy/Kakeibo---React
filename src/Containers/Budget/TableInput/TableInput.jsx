import React, { useState } from "react";
import classes from "./TableInput.module.css";
import TableLine from "./TableLine/TableLine";
import Loader from "../../../Components/Loader/Loader";
import add from "../../../img/control_point-24px.svg";

export default (props) => {
  const [addClicked, setAddClicked] = useState(false);

  let add_icon = (
    <div className={classes.loader}>
      <Loader></Loader>
    </div>
  );
  if (!addClicked) {
    add_icon = <img src={add} alt=""></img>;
  }
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <label> {props.title}</label>
      </div>
      <ul>
        {props.data.map((line, key) => (
          <li key={key}>
            <div className={classes.line_container}>
              <div className={classes.table_cell}>
                <TableLine
                  index={key}
                  title={line.title}
                  categories={props.categories}
                  category={line.category}
                  sum={line.sum}
                  name={props.title}
                  onChange={props.onChange}
                  id={line.id}
                  screeWidth={props.screeWidth}
                  delete_rec_by_id={props.delete_rec_by_id}
                  table_title={props.title}
                  from_date={line.from_date}
                  to_date={line.to_date}
                  updated={line.updated}
                  payments={line.payments}
                  recored_updated={line.recored_updated}
                ></TableLine>
              </div>
            </div>
          </li>
        ))}
        <li>
          <div
            className={classes.add}
            onClick={async () => {
              setAddClicked(true);
              await props.onChange(props.title, "add", "", "");
              setAddClicked(false);
            }}
          >
            {add_icon}
          </div>
        </li>
      </ul>
    </div>
  );
};
