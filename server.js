const express = require("express");
const bodyParser = require("body-parser");
const Json2csvParser = require("json2csv").Parser;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/file/chart", (req, res) => {
  const currency =
    req.body[0].Cur_ID == "145"
      ? "USD"
      : req.body[0].Cur_ID == "292"
        ? "EUR"
        : req.body[0].Cur_ID == "298"
          ? "RUR"
          : null;
  const fields = ["Date", currency];
  let dataCSV = [];
  req.body.forEach(element => {
    let obj = {};
    obj.Date = element.Date.substring(0, 10);
    obj[currency] = element.Cur_OfficialRate;
    dataCSV.push(obj);
  });
  const json2csvParser = new Json2csvParser({ fields });
  const csv = json2csvParser.parse(dataCSV);
  res.send(csv);
});

app.post("/file/table", (req, res) => {
  const { values, dates, columns } = req.body;
  let curAbbreviation = columns.map(elem => elem.name);
  const fields = ["Date", ...curAbbreviation];
  for (let i = 0; i < dates.length; i++) {
    values[i].unshift(dates[i]);
  }
  values.unshift(fields);
  let strCSV = "";
  values.forEach(value => {
    strCSV += value.join(",") + "\n";
  });
  res.send(strCSV);
});

app.listen("5000", () => console.log("Server running"));
