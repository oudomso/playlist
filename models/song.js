module.exports = function (sequelize, DataTypes) {
  var song = sequelize.define("song", {
    song_title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    artist: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    }
    // song_url: {
    //   type: DataTypes.String,
    //   allowNull: false

    // }
  });

  song.associate = function (models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    song.hasMany(models.pldata, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return song;
};