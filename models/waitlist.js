let orm = require("../config/orm.js");

let waiting = {
    all: function (cb) {
        orm.all("waitlist", function (res) {
            cb(res);
        });
    },
    create: function (cols, vals, cb) {
        orm.create("waitlist", cols, vals, function (res) {
            cb(res);
        });
    },
    update: function (setCols, setVals, colParam, valParam, cb) {
        orm.update("waitlist", setCols, setVals, colParam, valParam, function (res) {
            cb(res);
        });
    },
    delete: function (colName, value, cb) {
        orm.delete("waitlist", colName, value, function (res) {
            cb(res);
        });
    }
};

module.exports = waiting; 