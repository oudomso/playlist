// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {

  // GET route for getting all of the playlist(dbTodo)
  app.get("/api/example", function (req, res) {
    // findAll returns all entries for a table when used with no options
    db.example.findAll({}).then(function (dbTodo) {
      // We have access to the todos as an argument inside of the callback function
      res.json(dbTodo);
    });
  });
  app.get("/api/pldata", function (req, res) {
    // findAll returns all entries for a table when used with no options
    db.example.findAll({}).then(function (dbTodo) {
      // We have access to the todos as an argument inside of the callback function
      res.json(dbTodo);
    });
  });

  // Get route for retrieving a single post
  app.get("/api/example/:id", function (req, res) {
    db.example.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function (dbPost) {
        res.json(dbPost);
      });
  });
  app.get("/api/pldata/:id", function (req, res) {
    var joinData = {};
    db.pldata.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function (dbPost) {
        joinData.id = dbPost.id;
        db.example.findOne({
          where: {
            id: dbPost.exampleId
          }
        }).then(function (results) {
          joinData.exampleData = results;
          db.song.findOne({
            where: {
              id: dbPost.songId
            }
          }).then(function (results) {
            joinData.songData = results;
            res.json(joinData);
          })
        })
      });
  });

  app.get("/api/example/pldata/:id", function (req, res) {
    var joinData = {};
    joinData.data = [];
    var temp = {};
    db.pldata.findAll({
      where: {
        exampleId: req.params.id
      }
    })
      .then(function (dbPost) {
        ///////////// iterate over dbPost
        // [{id:1, exampleId:7, songId:}
        // {id:1, exampleId:7, songId:}
        // {id:1, exampleId:7, songId:}
        // {id:1, exampleId:7, songId:}
        // {id:1, exampleId:7, songId:}]
        for (i = 0; i < dbPost.length; i++) {

          // joinData.id = dbPost[i].dataValues.id;
          temp.id = dbPost[i].dataValues.id;
          db.example.findOne({
            where: {
              id: dbPost[i].dataValues.exampleId
            }
          }).then(function (results) {
            console.log("results", results);
            // joinData.exampleData = results;
            temp.exampleData = results;
            db.song.findOne({
              where: {
                id: dbPost[i].dataValues.songId
              }
            }).then(function (results) {

              // joinData.songData = results;
              temp.songData = results;
              joinData.data.push(temp);
              if (i == dbPost.length) {
                res.json(joinData);
              }
            })
          })
        }

        ////////////
      });
  });
  app.post("/api/pldata", function (req, res) {
    console.log(req.body);
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    db.pldata.create({
      exampleId: req.body.exampleId,
      songId: req.body.songId,
    })
      .then(function (dbTodo) {
        // We have access to the new todo as an argument inside of the callback function
        res.json(dbTodo);
      });
  });
  app.post("/api/")
  // POST route for saving a new playlist
  app.post("/api/example", function (req, res) {
    console.log(req.body);
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    db.example.create({
      playlist_name: req.body.playlist_name,
      type_of_playlist: req.body.type_of_playlist,
    })
      .then(function (dbTodo) {
        // We have access to the new todo as an argument inside of the callback function
        res.json(dbTodo);
      });
  });
  app.get("/api/song", function (req, res) {
    // findAll returns all entries for a table when used with no options
    db.song.findAll({}).then(function (dbTodo) {
      // We have access to the todos as an argument inside of the callback function
      res.json(dbTodo);
    });
  });

  // Get route for retrieving a single post
  app.get("/api/song/:id", function (req, res) {
    db.song.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function (dbPost) {
        res.json(dbPost);
      });
  });
  // POST route for saving a new song
  app.post("/api/song", function (req, res) {
    console.log(req.body);
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    db.song.create({
      song_title: req.body.song_title,
      artist: req.body.artist,
      genre: req.body.genre
    })
      .then(function (dbTodo) {
        // We have access to the new todo as an argument inside of the callback function
        res.json(dbTodo);
      });
  });

  app.delete("/api/example/:id", function (req, res) {
    // Delete the Author with the id available to us in req.params.id
    db.example.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbAuthor) {
      res.json(dbAuthor);
    });
  });
};
