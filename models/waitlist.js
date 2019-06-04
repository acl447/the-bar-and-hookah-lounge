let orm = require("../config/orm.js");

let waiting = {
    all: function (cb) {
        orm.all("waitlist", function (res) {
            cb(res);
        });
    },
    create: function (colName, value, cb) {
        orm.create("waitlist", colName, value, function (res) {
            cb(res);
        });
    },
    update: function (setCol, setVal, colParam, valParam, cb) {
        orm.update("waitlist", setCol, setVal, colParam, valParam, function (res) {
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