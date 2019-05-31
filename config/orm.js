let connection = require("../config/connection.js");

let orm = {
    all: function(tableName, cb) {
        connection.query("SELECT * FROM " + tableName + ";",
        function(err, result) {
            if (err) {
                throw err;
              }
              cb(result);
        });
    },
    create: function (tableName, colName, value, cb) {
        connection.query("INSERT INTO " + tableName 
        + " ( " + colName + " ) "
        + " VALUES (?)" , [value], 
        function (err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    update: function (tableName, setCol, setVal, colParam, valParam, cb) {
        connection.query("UPDATE " + tableName 
        + " SET " + setCol 
        + " = ? WHERE " + colParam 
        + " = ?", [setVal, valParam],
        function (err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    delete: function (tableName, colName, value, cb) {
        connection.query("DELETE FROM " + tableName 
        + " WHERE " + colName 
        + " = ?", [value],
        function (err, result) {
            if (err) throw err;
            cb(result);
        });
    } 
};

module.exports = orm;