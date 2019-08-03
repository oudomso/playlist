module.exports = function (sequelize, DataTypes) {
  var pldata = sequelize.define("pldata", {

  });

  pldata.associate = function (models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    pldata.belongsTo(models.song, {
    });
    pldata.belongsTo(models.example, {
    });
  };

  return pldata;
};