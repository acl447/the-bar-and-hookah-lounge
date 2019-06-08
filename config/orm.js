let connection = require("../config/connection.js");

function printQms(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
};

function objToSql(ob) {
    let arr = [];

    for (let key in ob) {
        let value = ob[key];

        // if (Object.hasOwnProperty.call(ob, key)) {
        //     if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
        // }

        arr.push(key + "=" + value);
        // }
    }

    return arr.toString();
}


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
    update: function (tableName, objColVals, condition, cb) {
        let queryString = "UPDATE " + tableName;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString,
            function (err, result) {
                if (err) throw err;
                cb(result);
            });
    },
    delete: function (tableName, colName, value, cb) {
        console.log("Delete Value: ", value)
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