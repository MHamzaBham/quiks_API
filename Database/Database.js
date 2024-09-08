const { con } = require("./DBConnection");

// make functions with queries in it, use arguments to make generic functions and don't forget to export them

function getPromise(executor) {
  return new Promise((resolve, reject) => {
    executor(resolve, reject);
  });
}
async function runAnyQuery(sql) {
  // These queries might run only one time, like making a table or a database so try to call them here

  const promise = new Promise(function (resolve, reject) {
    con.query(sql, async function (err, result) {
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

// generic function to get the data from multiple tables using joins
// can specifiy the fitering conditons. Study params
// generic function to get the data from multiple tables using joins
// can specifiy the fitering conditons. Study params
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
  const queryString = `SELECT ${columnNames} FROM ${baseTable} ${joinType.toUpperCase()} JOIN ${joinTable} ON ${joinCondition} ${filterCondition ? `WHERE ${filterCondition}` : ""
    }`;

  return getPromise((resolve, reject) => {
    con.query(queryString, async function (err, result, fields) {
      if (result) {
        resolve(result);
      }
      if (err) {
        reject(err);
      }
    });
  });
}

function insertData(queryString, values) {
  // This function will be used in to insert data. Write query and values in controller and pass to this function
  const promise = new Promise(function (resolve, reject) {
    con.query(queryString, values, async function (err, result, fields) {
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

// get data by id
function getById(table, id) {
  let queryString = `SELECT * FROM ${table} WHERE id=${parseInt(id)};`;

  const promise = new Promise(function (resolve, reject) {
    con.query(queryString, function (err, result, fields) {
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

// delete the data by id
function deleteById(table, id) {
  let queryString = `DELETE FROM ${table} WHERE id=${id};`;

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

// get user by email
function findByEmail(email) {
  const queryString = `SELECT * FROM users WHERE email = '${email}'`
  const promise = new Promise((resolve, reject) => {
    con.query(queryString, async function (err, result) {
      if (result) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  })

  return promise;
}

function storeUser(user) {
  const queryString = `INSERT INTO users (name, email, password) VALUES (?, ?, ?);`
  const promise = new Promise((resolve, reject) => {
    con.query(queryString, [user.name, user.email, user.password], async function (err, result) {
      if (result) {
        console.log(result);
        resolve(result);
      } else {
        reject(err);
      }
    })
  })

  return promise;
}

module.exports = {
  con,
  runAnyQuery,
  getFromTable,
  insertData,
  getFromMultipleTables,
  getById,
  deleteById,
  findByEmail,
  storeUser
};
