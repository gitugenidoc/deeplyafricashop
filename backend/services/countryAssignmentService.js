const countries = require("../data/countries.json");
const { randomCountry } = require("../utils/randomCountry");

function assignCountryForOrder() {
  return randomCountry(countries);
}

module.exports = { assignCountryForOrder };
