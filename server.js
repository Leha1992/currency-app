const express = require("express");
const bodyParser = require("body-parser");
const Json2csvParser = require("json2csv").Parser;

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
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
  let data = [];
  let allValues = [dates];

  for (let i = 0; i < columns.length; i++) {
    let arr = [];
    for (let j = 0; j < values.length; j++) {
      arr.push(values[j][i]);
    }
    allValues.push(arr);
  }

  console.log(data);
  const json2csvParser = new Json2csvParser({ fields });
  const csv = json2csvParser.parse(data);
  res.send(allValues);
});

app.listen("5000", () => console.log("Server running"));
