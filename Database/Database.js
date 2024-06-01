const {con} = require('./DBConnection');

// make functions with queries in it, use arguments to make generic functions and don't forget to export them

function runAnyQuery(sql) {
  // These queries might run only one time, like making a table or a database so try to call them here
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Success!");
  });
}

function getFromTable(columnNames, table, condition, sort, limit) {
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

module.exports = { con, getFromTable, insertData };
