require("dotenv").config();
var keys = require("./keys.js");
const moment = require("moment");
moment().format();



const axios = require("axios");
var Spotify = require("node-spotify-api");

//STAY DRY!!!
let type = process.argv[2];
let input = process.argv.slice(3);

//Sets user inputs as either the song or the band
let bandArr = [];

// Spotify search function... to be called back later in switch statement
function spotifySearch(searchTerm) {
  spotify
    .search({ type: "track", query: searchTerm, limit: 1 })
    .then(function(response) {
      console.log("---------SONG RESPONSE--------");
      // console.log("Full: " + response.tracks.items[0].name);
      const data = response.tracks.items[0];
      songArr = [
        `YOUR SPOTIFY RESULTS`,
        `Artist: ${data.artists[0].name}`,
        `Song Name: ${data.name}`,
        `Preview here: ${data.preview_url}`,
        `Album: ${data.album.name}`
      ]
      console.log(songArr.join('\n------------\n'))
    })
    .catch(function(err) {
      console.log(err);
    });
}

function bandSearch(searchTerm) {
  axios
    .get(
      `https://rest.bandsintown.com/artists/${searchTerm}/events?app_id=codingbootcamp`
    )
    .then(function(response) {
      console.log("---------BAND RESPONSE--------");
      const data = response.data[0]
      bandArr = [
        `YOUR CONCERT RESULTS`,
        `Venue: ${data.venue.name}`,
        `Location: ${data.venue.city}`,
        `Date: ${moment(data.datetime).format('MM/DD/YYYY')}`
      ];
      console.log(bandArr.join("\n----------\n"));
    })
    .catch(function(error) {
      console.log(error);
    });
}

function movieSearch(searchTerm) {
  axios.get(`http://www.omdbapi.com/?t=${searchTerm}&y=&plot=short&apikey=trilogy`).then(
    function(response) {
      const data = response.data
      movieArr = [
        `YOUR MOVIE RESULTS`,
        `title: ${data.Title}`,
        `year: ${data.Year}`,
        `imdb rating: ${data.imdbRating}`,
        `country: ${data.Country}`,
        `language: ${data.Language}`,
        `plot: ${data.Plot}`,
        `actors: ${data.Actors}`
      ]
      console.log(movieArr.join("\n----------\n"));

    })
  };





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
  
  //  Takes the input of the user, concatinates the arguments,
  //  inserts plus signs, and passes them as arguments in our
  //  search function.
    spotifySearch(input.join("+"));
    break;

  case "concert-this":
  //  console.log("---switch is working: CONCERT ---");
    bandSearch(input.join("+"));

    break;

  case "movie-this":
//     console.log("---switch is working: MOVIE ---");
    movieSearch(input.join("+"));
    break;
}
