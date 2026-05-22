const { findOrderByToken } = require("../services/storageService");
const countries = require("../data/countries.json");

async function revealCountryPack(request, response) {
  const order = await findOrderByToken(request.params.token);
  if (!order) {
    response.status(404).json({ error: "Reveal token not found." });
    return;
  }
  const country = countries.find((entry) => entry.code === order.assignedCountry);
  if (!country) {
    response.status(500).json({ error: "Assigned country pack is unavailable." });
    return;
  }
  response.json(country);
}

module.exports = { revealCountryPack };
