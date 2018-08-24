import React, { Component, Fragment } from "react";

import currencyId from "../currencyId";

const styleTable = {
  border: "1px solid #000",
  padding: "5px 10px",
  textAlign: "center"
};

class TableCurrency extends Component {
  state = {
    currentCurrancy: "USD"
  };

  changeCurrentCurrency = e => {
    this.setState({
      currentCurrancy: e.target.value
    });
  };

  render() {
    return (
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          <label>
            USD
            <input
              onClick={this.changeCurrentCurrency}
              id={currencyId.USD}
              type="radio"
              name="chooseCurrency"
              value="USD"
            />
          </label>
          <label>
            EUR
            <input
              onClick={this.changeCurrentCurrency}
              id={currencyId.EUR}
              type="radio"
              name="chooseCurrency"
              value="EUR"
            />
          </label>
          <label>
            RUB
            <input
              onClick={this.changeCurrentCurrency}
              id={currencyId.RUB}
              type="radio"
              name="chooseCurrency"
              value="RUB"
            />
          </label>
        </div>
        <button onClick={this.getData}>+</button>
        <table style={{ borderCollapse: "collapse" }}>
          <caption>Таблица</caption>
          <tbody>
            <tr>
              <th colSpan="2" style={styleTable}>
                {this.props.currencyAbbreviation}
              </th>
            </tr>
            {this.props.rate.map((item, idx) => (
              <Fragment key={idx}>
                <tr>
                  <td style={styleTable}>{item.Date.slice(0, 10)}</td>
                  <td style={styleTable}>{item.Cur_OfficialRate}</td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TableCurrency;
