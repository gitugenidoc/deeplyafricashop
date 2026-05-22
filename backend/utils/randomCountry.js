const crypto = require("node:crypto");

function randomCountry(countries) {
  if (!Array.isArray(countries) || !countries.length) {
    throw new Error("At least one country pack is required.");
  }
  return countries[crypto.randomInt(countries.length)];
}

module.exports = { randomCountry };
