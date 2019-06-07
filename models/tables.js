let orm = require("../config/orm.js");

let reservation = {
    all: function (cb) {
        orm.all("reservations", function (res) {
            cb(res);
        });
    },
    create: function (cols, vals, cb) {
        orm.create("reservations", cols, vals, function (res) {
            cb(res);
        });
    },
    update: function (objColVals, condition, cb) {
        orm.update("reservations", objColVals, condition, function (res) {
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