import React from "react";

const AddColumnInTable = props => {
  return (
    <button
      style={{
        backgroundColor: "#B7E6E6",
        padding: "5px",
        borderRadius: "3px",
        border: "1px solid #555",
        color: "#fff",
        cursor: "pointer",
        outline: "none",
        alignSelf: "center",
        marginLeft: "10px"
      }}
      onClick={props.getDataForCoulumn}
    >
      +
    </button>
  );
};

export default AddColumnInTable;
