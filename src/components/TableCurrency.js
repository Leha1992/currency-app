import React, { Component } from "react";

import currencyId from "../currencyId";

class TableCurrency extends Component {
  render() {
    console.log(this.props.rate);
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
              onClick={this.props.changeCurrency}
              id={currencyId.USD}
              type="radio"
              name="chooseCurrency"
              value="USD"
            />
          </label>
          <label>
            EUR
            <input
              onClick={this.props.changeCurrency}
              id={currencyId.EUR}
              type="radio"
              name="chooseCurrency"
              value="EUR"
            />
          </label>
          <label>
            RUB
            <input
              onClick={this.props.changeCurrency}
              id={currencyId.RUB}
              type="radio"
              name="chooseCurrency"
              value="RUB"
            />
          </label>
        </div>
        <h3>Table Caption</h3>
        <button onClick={this.getData}>+</button>
        <ul>
          {this.props.rate.map(item => (
            <li>{item.Cur_OfficialRate}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default TableCurrency;
