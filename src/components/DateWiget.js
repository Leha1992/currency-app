import React, { Component } from "react";

import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

class DateWiget extends Component {
  render() {
    const { startDate, endDate, changeStartDate, changeEndDate } = this.props;
    return (
      <div
        style={{
          margin: "0 auto",
          marginTop: "20px",
          width: "300px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          backgroundColor: "#B7E6E6",
          borderRadius: "10px",
          border: "1px solid grey",
          padding: "10px",
          color: "#777"
        }}
      >
        <span style={{ fontWeight: "bold", marginBottom: "20px" }}>
          Выберите начальную и конечную дату
        </span>
        <div style={{ marginBottom: "15px" }}>
          <span style={{ fontWeight: "bold", marginRight: "10px" }}>От</span>
          <DayPickerInput
            modifiersStyles={{ padding: "10px" }}
            onDayChange={e => changeStartDate(e)}
            value={startDate}
            ref={el => (this.startDate = el)}
          />
        </div>
        <div>
          <span style={{ fontWeight: "bold", marginRight: "10px" }}>До</span>
          <DayPickerInput
            onDayChange={changeEndDate}
            value={endDate}
            ref={el => (this.endDate = el)}
          />
        </div>
      </div>
    );
  }
}

export default DateWiget;
