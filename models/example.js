module.exports = function (sequelize, DataTypes) {

  var example = sequelize.define("example", {
    // Giving the Author model a name of type STRING
    playlist_name: DataTypes.STRING,
    type_of_playlist: DataTypes.STRING
  });

  example.associate = function (models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    example.hasMany(models.pldata, {
    });
  };
  return example;
};
