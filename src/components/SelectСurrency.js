import React from "react";

const styleSelect = {
  outline: "none",
  padding: "5px",
  borderRadius: "3px",
  marginBottom: "20px",
  cursor: "pointer"
};

const SelectCurrency = props => {
  return (
    <div style={{ marginTop: "20px" }}>
      <span style={{ fontWeight: "bold", marginRight: "10px" }}>
        Выберите валюту
      </span>
      <select style={styleSelect} onChange={props.onChange}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="RUB">RUB</option>
      </select>
    </div>
  );
};

export default SelectCurrency;
