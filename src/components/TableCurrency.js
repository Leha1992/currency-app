import React, { Component } from "react";
import axios from "axios";

import RadioButton from "./RadioButton";
import Table from "./Table";
import ExportButton from "./ExportButton";
import AddColumnInTable from "./AddColumnInTable";

import currencyId from "../currencyId";
import currencyAbbreviation from "../currencyAbbreviation";
import api from "../api";

class TableCurrency extends Component {
  state = {
    selectCurrency: "",
    columns: [],
    dates: [],
    values: []
  };

  componentDidMount() {
    const { USD, EUR, RUB } = currencyAbbreviation;
    let columns = {};
    let name;
    switch (String(this.props.rate[0].Cur_ID)) {
      case currencyId.USD:
        name = USD;
        break;
      case currencyId.EUR:
        name = EUR;
        break;
      case currencyId.RUB:
        name = RUB;
        break;
      default:
        throw new Error("No such currency");
    }

    columns.id = this.props.rate[0].Cur_ID;
    columns.name = name;

    let values = this.props.rate.map(item => {
      let array = [];
      array.push(item.Cur_OfficialRate);
      return array;
    });
    let dates = this.props.rate.map(item => item.Date.substring(0, 10));
    this.setState({
      dates: [...dates],
      columns: [...this.state.columns, columns],
      values: [...this.state.values, ...values]
    });
  }

  changeSelectCurrency = e => {
    this.setState({
      selectCurrency: e.target.value
    });
  };

  getDataForCoulumn = () => {
    const { selectCurrency, columns } = this.state;
    const { startDate, endDate } = this.props;

    for (let i = 0; i < columns.length; i++) {
      if (!selectCurrency) {
        alert("Валюта не выбрана");
        return;
      } else if (columns[i].name.includes(selectCurrency)) {
        alert("Значение этой валюты уже есть в таблице!");
        return;
      }
    }

    let currency =
      selectCurrency === currencyAbbreviation.USD
        ? currencyId.USD
        : selectCurrency === currencyAbbreviation.EUR
          ? currencyId.EUR
          : selectCurrency === currencyAbbreviation.RUB
            ? currencyId.RUB
            : null;

    if (selectCurrency) {
      api(currency, startDate, endDate).then(res => {
        let columns = {};
        columns.id = res[0].Cur_ID;
        columns.name = selectCurrency;
        let values = this.state.values.slice();
        for (let i = 0; i < values.length; i++) {
          values[i].push(res[i].Cur_OfficialRate);
        }
        this.setState({
          columns: [...this.state.columns, columns],
          values: [...values]
        });
      });
    } else {
      alert("Выберете валюту");
    }
  };

  getCSV = () => {
    let isDownload = window.confirm("Хотите сохранить данные из таблицы?");
    if (isDownload) {
      axios
        .post("/file/table", this.state)
        .then(function(response) {
          const { data } = response;
          console.log(response.data);
          const link = document.createElement("a");
          link.download = "data.csv";
          link.href = "data:application/csv," + escape(data);
          link.click();
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };

  render() {
    const styles = {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    };
    const { USD, EUR, RUB } = currencyAbbreviation;
    const { values, columns, dates } = this.state;
    return (
      <div>
        <div style={styles}>
          <RadioButton
            value={USD}
            changeSelectCurrency={this.changeSelectCurrency}
          />
          <RadioButton
            value={EUR}
            changeSelectCurrency={this.changeSelectCurrency}
          />
          <RadioButton
            value={RUB}
            changeSelectCurrency={this.changeSelectCurrency}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h3>Курс белорусского рубля</h3>
          <AddColumnInTable getDataForCoulumn={this.getDataForCoulumn} />
        </div>

        <Table values={values} dates={dates} columns={columns} />
        <ExportButton getCSV={this.getCSV} />
      </div>
    );
  }
}

export default TableCurrency;
