import React, { Component } from "react";
import "./App.css";
import { Line } from "react-chartjs-2";

import Select from "./Select";

const data = {
  labels: [],
  datasets: [
    {
      label: "Currency",
      fill: true,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: "butt",
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 5,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10
    }
  ]
};

class App extends Component {
  state = {
    rate: [],
    endDate: new Date().toISOString().slice(0, 10),
    startDate:
      new Date().toISOString().slice(0, 8) +
      String(
        +new Date()
          .toISOString()
          .slice(0, 10)
          .slice(-2) - 6
      ),
    currency: "291"
  };

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    if (nextState.currency !== this.state.currency) {
      this.api(nextState.currency);
    }
  }

  componentDidMount() {
    this.setDay();
    this.api(this.state.currency);
  }

  api = currentCurrency => {
    fetch(
      `http://www.nbrb.by/API/ExRates/Rates/Dynamics/${currentCurrency}?startDate=${
        this.state.startDate
      }&endDate=${this.state.endDate}`
    )
      .then(currency => currency.json())
      .then(res => {
        this.setState({
          rate: res
        });
      });
  };

  setDay = () => {
    let newDate = new Date();

    for (let i = 0; i < 7; i++) {
      let day = new Date(
        newDate.getFullYear(),
        newDate.getMonth(),
        newDate.getDate() - 6 + i
      ).toLocaleString("ru", { weekday: "long" });
      data.labels.push(day);
    }
  };

  changeCurrency = e => {
    let newCurrency;
    switch (e.target.value) {
      case "USD":
        newCurrency = "291";
        break;
      case "EUR":
        newCurrency = "292";
        break;
      case "RUB":
        newCurrency = "298";
        break;
      default:
        throw new Error("No such currency");
    }
    this.setState({
      currency: newCurrency
    });
  };

  render() {
    return (
      <div className="App">
        <Line
          data={data}
          rate={
            (data.datasets[0].data = this.state.rate.map(
              item => item.Cur_OfficialRate
            ))
          }
        />
        <Select onChange={this.changeCurrency} currency={this.state.currency} />
      </div>
    );
  }
}

export default App;
