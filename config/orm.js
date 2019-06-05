let connection = require("../config/connection.js");

function printQms(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
};


let orm = {
    all: function (tableName, cb) {
        connection.query("SELECT * FROM " + tableName + ";",
            function (err, result) {
                if (err) {
                    throw err;
                }
                cb(result);
            });
    },
    create: function (tableName, cols, vals, cb) {
        let queryString = "INSERT INTO " + tableName;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQms(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, function (err, result) {
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