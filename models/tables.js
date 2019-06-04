let orm = require("../config/orm.js");

let reservation = {
    all: function (cb) {
        orm.all("reservations", function (res) {
            cb(res);
        });
    },
    create: function (colName, value, cb) {
        orm.create("reservations", colName, value, function (res) {
            cb(res);
        });
    },
    update: function (setCol, setVal, colParam, valParam, cb) {
        orm.update("reservations", setCol, setVal, colParam, valParam, function (res) {
            cb(res);
        });
    },
    delete: function (colName, value, cb) {
        orm.delete("reservations", colName, value, function (res) {
            cb(res);
        });
    }
};

module.exports = reservation;