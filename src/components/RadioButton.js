import React from "react";

import currencyId from "../currencyId";

const styleRadioButton = {
  cursor: "pointer",
  fontWeight: "bold"
};

const RadioButton = ({ value, changeSelectCurrency }) => {
  return (
    <label style={styleRadioButton}>
      {value}
      <input
        onClick={changeSelectCurrency}
        id={currencyId.USD}
        type="radio"
        name="chooseCurrency"
        value={value}
      />
    </label>
  );
};

export default RadioButton;
