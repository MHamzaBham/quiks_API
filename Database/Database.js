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

// make functions with queries in it, use arguments to make generic functions and don't forget to export them

function getPromise(executor) {
  return new Promise((resolve, reject) => {
    executor(resolve, reject);
  });
}
function runAnyQuery(sql) {
  // These queries might run only one time, like making a table or a database so try to call them here
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Success!");
  });
}

function getFromTable(
  columnNames,
  table,
  condition,
  joinType,
  sort,
  limit,
  join
) {
  let queryString = `SELECT ${columnNames} FROM ${table}`;
  if (condition) {
    queryString += ` WHERE ${condition}`;
  }
  if (sort) {
    queryString += ` ORDER BY ${sort}`;
  }
  if (limit) {
    queryString += ` LIMIT ${limit}`;
  }
  const promise = new Promise(function (resolve, reject) {
    con.query(queryString, async function (err, result, fields) {
      if (result) {
        resolve(result);
      }
      if (err) {
        reject(err);
      }
    });
  });

  return promise;
}

function getFromMultipleTables(
  baseTable,
  joinTable,
  joinType,
  joinCondition,
  filterCondition,
  columnNames
) {
  const validJoinTypes = ["INNER", "LEFT", "RIGHT"];
  if (!validJoinTypes.includes(joinType.toUpperCase())) {
    return new Error("Invalid Join Type");
  }
  const queryString = `SELECT ${columnNames} FROM ${baseTable} ${joinType.toUpperCase()} JOIN ${joinTable} ON ${joinCondition} ${
    filterCondition ? `WHERE ${filterCondition}` : ""
  }`;
  console.log("string", queryString);

  return getPromise((resolve, reject) => {
    con.query(queryString, async function (err, result, fields) {
      if (result) {
        console.log(result);
        resolve(result);
      }
      if (err) {
        reject(err);
      }
    });
  });
}

function insertData(query, values) {
  // This function will be used in to insert data. Write query and values in controller and pass to this function
  con.query(query, values, (err, results) => {
    if (err) {
      console.error("Error executing query", err);
      return err;
    } else {
      return results;
    }
  });
}

module.exports = { con, getFromTable, insertData, getFromMultipleTables };
