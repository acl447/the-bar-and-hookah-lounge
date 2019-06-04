let orm = require("../config/orm.js");

let flavor = {
  all: function (cb) {
    orm.all("flavors", function(res) {
      cb(res);
    });
  },
  create: function (colName, value, cb) {
    orm.create("flavors", colName, value, function(res) {
      cb(res);
    });
  },
  update: function (setCol, setVal, colParam, valParam, cb) {
    orm.update("flavors", setCol, setVal, colParam, valParam, function(res) {
      cb(res);
    });
  },
  delete: function (colName, value, cb) {
    orm.delete("flavors", colName, value, function(res) {
      cb(res);
    });
  }
};

module.exports = flavor;
