var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Playlist Creator",
        examples: dbExamples
      });
    });
  });
  app.get("/example/pldata/:id", function(req, res) {
    var joinData = {};
    joinData.data = [];

    db.pldata.findAll({
      where: {
        exampleId: req.params.id
      }
    })
      .then(function (dbPost) {
        // console.log("dbPost Data: ", dbPost)
        for (i = 0; i < dbPost.length; i++) {

          db.song.findOne({
            where: {
              id: dbPost[i].dataValues.songId
            }
          }).then(function (results) {
            joinData.data.push(results);
              res.render("example", {
                songs: joinData
              });

          })
        }

        ////////////
      });
  });
  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
    // var joinData = {};
    // joinData.data = [];

    // db.pldata.findAll({
    //   where: {
    //     exampleId: req.params.id
    //   }
    // })
    //   .then(function (dbPost) {
    //     // console.log("dbPost Data: ", dbPost)
    //     for (i = 0; i < dbPost.length; i++) {

    //       db.song.findOne({
    //         where: {
    //           id: dbPost[i].dataValues.songId
    //         }
    //       }).then(function (results) {
    //         joinData.data.push(results);
    //       })
    //     }
    //     res.render("example", {
    //       songs: joinData
    //     });
    //   });
  });
  app.get("/songs/:id", function(req, res) {
    db.Song.findOne({ where: { id: req.params.id } }).then(function(dbSong) {
      res.render("example", {
        Song: dbSong
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
