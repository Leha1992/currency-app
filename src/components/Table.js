import React from "react";

const styleCells = {
  border: "1px solid #777",
  padding: "5px 10px",
  textAlign: "center",
  backgroundColor: "#B7E6E6",
  color: "#333"
};

const styelTable = {
  borderCollapse: "collapse",
  borderRadius: "5px"
};

const Table = ({ dates, columns, values }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "10px"
      }}
    >
      <table style={styelTable}>
        <tbody>
          <tr>
            <th style={styleCells}>Дата</th>
          </tr>
          {dates.map(date => {
            return (
              <tr key={date}>
                <td style={styleCells}>{date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <table style={styelTable}>
        <tbody>
          <tr>
            {columns.map(column => (
              <th id={column.id} key={column.id} style={styleCells}>
                {column.name}
              </th>
            ))}
          </tr>
          {values.map((element, idx) => {
            return (
              <tr key={idx}>
                {element.map((value, idx) => (
                  <td key={idx} style={styleCells}>
                    {value}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
