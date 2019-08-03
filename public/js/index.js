// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function (example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/example",
      data: JSON.stringify(example)
    });
  },
  getExamples: function () {
    return $.ajax({
      url: "api/example",
      type: "GET"
    });
  },
  deleteExample: function (id) {
    return $.ajax({
      url: "api/example/" + id,
      type: "DELETE"
    });
  },
  saveSong: function (songs) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/song",
      data: JSON.stringify(songs)
    });
  },
  getSong: function (songs) {
    return $.ajax({
      url: "api/song",
      type: "GET"
    });
  },
  deleteSong: function (id) {
    return $.ajax({
      url: "api/song/" + id,
      type: "DELETE"
    });
  },
  addToPlaylist: function (playlistId, songId) {
    return $.ajax({
      url: `api/pldata/${playlistId}`,
      type: "POST",
      data: songId
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function () {
  API.getExamples().then(function (data) {
    var $examples = data.map(function (example) {
      var $a = $("<a>")
        .text(example.playlist_name)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function (event) {
  event.preventDefault();

  var example = {
    playlist_name: $exampleText.val().trim(),
    type_of_playlist: $exampleDescription.val().trim()
  };

  if (!(example.playlist_name && example.type_of_playlist)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function () {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function () {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);

$(document).ready(function () {
  $("#jquery_jplayer_1").jPlayer({
    ready: function () {
      $(this).jPlayer("setMedia", {
        title: "Passenger",
        mp3: "./media/Passenger.mp3"
      });
    },
    cssSelectorAncestor: "#jp_container_1",
    swfPath: "/js",
    supplied: "mp3",
    useStateClassSkin: true,
    autoBlur: false,
    smoothPlayBar: true,
    keyEnabled: true,
    remainingDuration: true,
    toggleDuration: true
  });
  $("#add-song").click(function () {
    event.preventDefault();

    var songs = {
      song_title: $("#song-name").val().trim(),
      artist: $("#artist").val().trim(),
      genre: $("#genre").val().trim()
    };

    if (!(songs.song_title && songs.artist && songs.genre)) {
      alert("You must enter song information!");
      return;
    }

    API.saveSong(songs).then(function () {
      refreshExamples();
      API.addToPlaylist(songs);
    });

    $("#song-name").val("");
    $("#artist").val("");
    $("#genre").val("");
  });
});
