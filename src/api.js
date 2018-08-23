const api = (currency, startDate, endDate) => {
  return fetch(
    `http://www.nbrb.by/API/ExRates/Rates/Dynamics/${currency}?startDate=${startDate}&endDate=${endDate}`
  ).then(currency => currency.json());
};

export default api;
