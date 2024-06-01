const mysql = require("mysql2");

// creates a connection with database
const con = mysql.createConnection({
  host: process.env.HOST,
  user: "root",
  password: "",
  database: "quiks_db",
});

con.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = { con };
