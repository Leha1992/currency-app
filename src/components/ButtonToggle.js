import React from "react";

const buttonStyle = {
  padding: "10px",
  backgroundColor: "#B7E6E6",
  border: "1px solid #555",
  borderRadius: "5px",
  color: "#555",
  cursor: "pointer",
  outline: "none",
  marginTop: "20px",
  marginBottom: "20px"
};

const ButtonToggle = ({ isTable, changeIsTable }) => {
  const text = isTable ? "Перейти в режим график" : "Перейти в режим таблицы";
  return (
    <button onClick={changeIsTable} style={buttonStyle}>
      {text}
    </button>
  );
};

export default ButtonToggle;
