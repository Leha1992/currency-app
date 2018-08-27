import React, { Component, Fragment } from "react";
import { Line } from "react-chartjs-2";
import { saveAs } from "file-saver/FileSaver";
import axios from "axios";

import SelectСurrency from "./SelectСurrency";
import DateWiget from "./DateWiget";
import ButtonToggle from "./ButtonToggle";
import TableCurrency from "./TableCurrency";
import ExportButton from "./ExportButton";

import api from "../api";
import currencyId from "../currencyId";
import data from "../dataForLine";
import currencyAbbreviation from "../currencyAbbreviation";

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
    currencyAbbreviation: currencyAbbreviation.USD,
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
    const { USD, EUR, RUB } = currencyAbbreviation;
    let newCurrency, newAbbreviation;
    switch (e.target.value) {
      case USD:
        newCurrency = currencyId.USD;
        newAbbreviation = USD;
        break;
      case EUR:
        newCurrency = currencyId.EUR;
        newAbbreviation = EUR;
        break;
      case RUB:
        newCurrency = currencyId.RUB;
        newAbbreviation = RUB;
        break;
      default:
        throw new Error("No such currency");
    }
    this.setState({
      currencyId: newCurrency,
      currencyAbbreviation: newAbbreviation
    });
  };

  changeStartDate = () => {
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
    this.setState(({ isTable, currencyId }) => {
      return {
        isTable: !isTable,
        currencyId: !isTable ? currencyId : "145"
      };
    });
  };

  getCSV = () => {
    let isDownload = window.confirm("Хотите сохранить данные из графика?");
    if (isDownload) {
      axios
        .post("/file/chart", this.state.rate, this.state.currencyAbbreviation)
        .then(function(response) {
          const { data } = response;
          var blob = new Blob([data], { type: "text/plain;charset=utf-8" });
          saveAs(blob, "data.chart.csv");
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };

  render() {
    const {
      startDate,
      endDate,
      isTable,
      currencyId,
      rate,
      currencyAbbreviation
    } = this.state;
    data.labels = this.state.rate.map(item => item.Date.slice(0, 10));
    data.datasets[0].data = this.state.rate.map(item => item.Cur_OfficialRate);
    return (
      <div style={{ textAlign: "center" }} className="App">
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

            <SelectСurrency
              onChange={this.changeCurrency}
              currency={currencyId}
            />
            <DateWiget
              startDate={startDate}
              endDate={endDate}
              changeStartDate={this.changeStartDate}
              changeEndDate={this.changeEndDate}
              ref={el => (this.wiget = el)}
            />

            <ExportButton getCSV={this.getCSV} />
          </Fragment>
        ) : (
          <TableCurrency
            startDate={startDate}
            endDate={endDate}
            currencyAbbreviation={currencyAbbreviation}
            changeCurrency={this.changeCurrency}
            rate={rate}
          />
        )}
      </div>
    );
  }
}

export default App;
