const mysql = require('mysql');

// creates a connection with database
const con = mysql.createConnection({
    host: process.env.HOST,
    user: "root",
    password: "",
    database: "quiks"
});

con.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
});

// make functions with queries in it, use arguments to make generic functions and don't forget to export them

function runAnyQuery(sql) { // These queries might run only one time, like making a table or a database so try to call them here
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Success!");
    });
}

function getFromTable(columnNames, table) {
    con.query(`SELECT ${columnNames} FROM ${table}`, async function (err, result, fields) {
        if (err) throw err;
        return result;
    });
}

function insertData(query, values) { // This function will be used in to insert data. Write query and values in controller and pass to this function
    con.query(query, values, (err, results) => {
        if (err) {
            console.error('Error executing query', err);
            return err;
        } else {
            return results;
        }
    });
}

module.exports = { con, getFromTable, insertData };