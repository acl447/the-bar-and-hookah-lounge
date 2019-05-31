module.exports = function(sequelize, DataTypes) {
  var Table = sequelize.define("Table", {
    numberInParty: DataTypes.INTEGER
  });
  return Table;
};
