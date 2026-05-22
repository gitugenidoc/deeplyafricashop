const crypto = require("node:crypto");

function generateToken() {
  return crypto.randomBytes(32).toString("base64url");
}

module.exports = { generateToken };
