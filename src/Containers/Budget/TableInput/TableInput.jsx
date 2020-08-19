import React, { useState } from "react";
import classes from "./TableInput.module.css";
import TableLine from "./TableLine/TableLine";
import Loader from "../../../Components/Loader/Loader";
import add from "../../../img/control_point-24px.svg";
import FAB from "../../../Components/Buttons/FAB/FAB";

export default (props) => {
  const [addClicked, setAddClicked] = useState(false);

  let add_icon = (
    <div className={classes.loader}>
      <Loader></Loader>
    </div>
  );
  if (!addClicked) {
    add_icon = <img src={add} alt=""></img>;
    add_icon = (
      <FAB
        title="add"
        size="small"
        color="#05394b"
        onClick={async () => {
          setAddClicked(true);
          await props.onChange(props.title, "add", "", "");
          setAddClicked(false);
        }}
      ></FAB>
    );
  }
  return (
    <div className={classes.container}>
      {/* <div className={classes.title}>
        <label> {props.title}</label>
      </div> */}

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
                  saveUpdateValueHandler={props.saveUpdateValueHandler}
                  remove_enabled={props.remove_enabled}
                  symbol={props.symbol}
                ></TableLine>
              </div>
            </div>
          </li>
        ))}

        {add_icon}
      </ul>
    </div>
  );
};
