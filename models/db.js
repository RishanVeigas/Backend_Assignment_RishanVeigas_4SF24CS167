const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("../database/hospital.sql", (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Connected to sqlite database");
});
module.exports = db;
