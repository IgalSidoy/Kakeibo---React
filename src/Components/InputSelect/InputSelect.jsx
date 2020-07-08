import React from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

export default (props) => {
  let options = "";
  let pattern = {};
  if (props.dataSet !== undefined) {
    options = props.dataSet.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ));
  }
  if (props.pattern !== undefined) {
    pattern = props.pattern;
  }
  let onKeyDown = props.onKeyDown;
  if (props.onKeyDown === undefined) onKeyDown = () => {};

  let disabled = false;
  if (props.disabled !== undefined) {
    disabled = props.disabled;
  }

  return (
    <TextField
      disabled={disabled}
      helperText={props.helperText}
      error={props.error}
      select={props.isSelect}
      label={props.label}
      size="small"
      variant="outlined"
      fullWidth={true}
      value={props.value}
      onChange={props.onChange}
      type={"text"}
      inputProps={pattern}
      onKeyDown={(e) => {
        onKeyDown(e);
      }}
    >
      {options}
    </TextField>
  );
};
