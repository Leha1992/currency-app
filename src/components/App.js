import React, { Component, Fragment } from "react";
import "./App.css";
import { Line } from "react-chartjs-2";

import Select from "./Select";
import DateWiget from "./DateWiget";
import data from "../dataForLine";
import api from "../api";
import currencyId from "../currencyId";
import ButtonToggle from "./ButtonToggle";
import TableCurrency from "./TableCurrency";

class App extends Component {
  state = {
    rate: [],
    endDate: new Date(Date.now() + 3600 * 3 * 1000)
      .toISOString()
      .substring(0, 10),
    startDate: new Date(new Date() - 6 * 86400 * 1000)
      .toISOString()
      .substring(0, 10),
    currencyId: currencyId.USD,
    isTable: false
  };

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    const { currencyId, startDate, endDate } = this.state;
    if (nextState.currencyId !== currencyId) {
      api(nextState.currencyId, startDate, endDate).then(res => {
        this.setState({
          rate: res
        });
      });
    } else if (nextState.startDate !== startDate) {
      api(currencyId, nextState.startDate, endDate).then(res => {
        this.setState({
          rate: res
        });
      });
    } else if (nextState.endDate !== endDate) {
      api(currencyId, startDate, nextState.endDate).then(res => {
        this.setState({
          rate: res
        });
      });
    }
  }

  componentDidMount() {
    const { currencyId, startDate, endDate } = this.state;
    api(currencyId, startDate, endDate).then(res => {
      this.setState({
        rate: res
      });
    });
  }

  changeCurrency = e => {
    let newCurrency;
    switch (e.target.value) {
      case "USD":
        newCurrency = currencyId.USD;
        break;
      case "EUR":
        newCurrency = currencyId.EUR;
        break;
      case "RUB":
        newCurrency = currencyId.RUB;
        break;
      default:
        throw new Error("No such currency");
    }
    this.setState({
      currencyId: newCurrency
    });
  };

  changeStartDate = e => {
    this.setState({
      startDate: this.wiget.startDate.state.value
    });
  };

  changeEndDate = () => {
    this.setState({
      endDate: this.wiget.endDate.state.value
    });
  };

  changeIsTable = () => {
    this.setState(({ startDate, isTable, currencyId }) => {
      return {
        isTable: !isTable,
        currencyId: !isTable ? currencyId : "145",
        startDate: !isTable
          ? startDate
          : new Date(new Date() - 6 * 86400 * 1000)
              .toISOString()
              .substring(0, 10)
      };
    });
  };

  render() {
    const { startDate, endDate, isTable, currencyId, rate } = this.state;
    console.log(currencyId);
    data.labels = this.state.rate.map(item => item.Date.slice(0, 10));
    data.datasets[0].data = this.state.rate.map(item => item.Cur_OfficialRate);
    return (
      <div className="App">
        <ButtonToggle isTable={isTable} changeIsTable={this.changeIsTable} />
        {!isTable ? (
          <Fragment>
            <div style={{ width: "80%", margin: "0 auto" }}>
              <Line
                data={data}
                day={data.labels}
                rate={data.datasets[0].data}
              />
            </div>

            <Select onChange={this.changeCurrency} currency={currencyId} />
            <DateWiget
              startDate={startDate}
              endDate={endDate}
              changeStartDate={this.changeStartDate}
              changeEndDate={this.changeEndDate}
              ref={el => (this.wiget = el)}
            />
          </Fragment>
        ) : (
          <TableCurrency changeCurrency={this.changeCurrency} rate={rate} />
        )}
      </div>
    );
  }
}

export default App;
