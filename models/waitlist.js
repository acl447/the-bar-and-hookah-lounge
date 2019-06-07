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
    update: function (objColVals, condition, cb) {
        orm.update("waitlist", objColVals, condition, function (res) {
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