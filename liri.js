require("dotenv").config();
const keys = require("./keys.js");
const fs = require("fs");

const moment = require("moment");
moment().format();

const axios = require("axios");
const Spotify = require("node-spotify-api");

//STAY DRY!!!
const type = process.argv[2];
const input = process.argv.slice(3);

//Sets user inputs as either the song or the band

// Not working right now... (not required)
function appendResults(results) {
  fs.appendFile("results.txt", results, function(err) {
    if (err) throw err;
    console.log("Results Saved!");
  });
}

// Spotify search function... to be called back later in switch statement
function spotifySearch(searchTerm) {
  switch (searchTerm) {
    case undefined || Array.length == 0:
      searchTerm = ["ace", "of", "base"];
      console.log(searchTerm);
      break;

    default:
      spotify
        .search({ type: "track", query: searchTerm, limit: 1 })
        .then(function(response) {
          // console.log("Full: " + response.tracks.items[0].name);
          const data = response.tracks.items[0];
          songArr = [
            `Artist: ${data.artists[0].name}`,
            `Song Name: ${data.name}`,
            `Preview here: ${data.preview_url}`,
            `Album: ${data.album.name}\n`
          ];
          appendResults(songArr.join(`\n------------\n`));
          console.log(`\nYOUR SPOTIFY RESULTS\n`);
          console.log(songArr.join(`\n------------\n`));
        })

        .catch(function(err) {
          console.log(err);
          console.log("Please enter a search term");
        });
  }
}

function bandSearch(searchTerm) {
  axios
    .get(
      `https://rest.bandsintown.com/artists/${searchTerm}/events?app_id=codingbootcamp`
    )
    .then(function(response) {
      console.log(`\n---------BAND RESPONSE--------\n`);
      const data = response.data[0];
      bandArr = [
        `YOUR CONCERT RESULTS`,
        `Venue: ${data.venue.name}`,
        `Location: ${data.venue.city}`,
        `Date: ${moment(data.datetime).format("MM/DD/YYYY")}\n`
      ];
      appendResults(bandArr.join(`\n------------\n`));
      console.log(bandArr.join("\n----------\n"));
    })
    .catch(function(error) {
      console.log(error);
    });
}

function movieSearch(searchTerm) {
  axios
    .get(`http://www.omdbapi.com/?t=${searchTerm}&y=&plot=short&apikey=trilogy`)
    .then(function(response) {
      const data = response.data;
      movieArr = [
        `title: ${data.Title}`,
        `year: ${data.Year}`,
        `imdb rating: ${data.imdbRating}`,
        `Rotten Tomatoes rating: ${data.Ratings[1].Value}`,
        `country: ${data.Country}`,
        `language: ${data.Language}`,
        `plot: ${data.Plot}`,
        `actors: ${data.Actors}\n`
      ];
      appendResults(movieArr.join(`\n------------\n`));
      console.log(`\n---------YOUR MOVIE RESULTS-------\n`);
      console.log(movieArr.join("\n----------\n"));
      //console.log(data)
    });
}

// If elses... want to change to a switch (AND DID IT!!)

// if ((type = "spotify-this-song")) {
//   console.log("Good Work Marshall");
//   console.log(song);
// } else if (type = "concert-this"){
//   console.log("Please enter a concert")
// }

// What does this line do?
var spotify = new Spotify(keys.spotify);
// var URL = "" + song;

// switch statement that checks what we're searching for
switch (type) {
  case "spotify-this-song":
    //  Takes the input of the user, concatinates the process.argv array values,
    //  inserts plus signs, and passes them as arguments in our
    //  search function.
    spotifySearch(input.join("+"));
    //Not a good solution (not required)
    //  appendResults(spotifySearch(input.join("+")));
    break;

  case "concert-this":
    bandSearch(input.join("+"));

    break;

  case "movie-this":
    movieSearch(input.join("+"));
    break;

  case "do-what-it-says":
    fs.readFile("random.txt", "utf-8", function(err, data) {
      let random = data.split(",");
      console.log(`Searching for "${random[1]}"`);
      //console.log(random);

      switch (random[0]) {
        case "spotify-this-song":
          spotifySearch(random[1]);
          break;

        case "concert-this":
          bandSearch(random[1]);
          break;

        case "movie-this":
          movieSearch(random[1]);
          break;
      }
    });

  default:
    console.log(
      `\nPlease enter a search type: \n'spotify-this-song' 'concert-this' 'movie-this' 'do-what-it-says'\n`
    );
}
