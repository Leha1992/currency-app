import React from "react";

const Select = props => {
  return (
    <select style={{ outline: "none" }} onChange={props.onChange}>
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="RUB">RUB</option>
    </select>
  );
};

export default Select;
