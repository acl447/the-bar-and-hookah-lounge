let orm = require("../config/orm.js");

let flavor = {
  all: function (cb) {
    orm.all("flavors", function (res) {
      cb(res);
    });
  },
  create: function (cols, vals, cb) {
    orm.create("flavors", cols, vals, function (res) {
      cb(res);
    });
  },
  update: function (objColVals, condition, cb) {
    orm.update("flavors", objColVals, condition, function (res) {
      cb(res);
    });
  },
  delete: function (colName, value, cb) {
    orm.delete("flavors", colName, value, function (res) {
      cb(res);
    });
  }
};

module.exports = flavor;
