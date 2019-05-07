require("dotenv").config();
var keys = require("./keys.js");

const axios = require("axios");
var Spotify = require("node-spotify-api");


let song = process.argv.slice(3).join("+");
// switch (process.argv[2]){
//     case 'spotify-this-song':
//     break;

// }

if ((process.argv[2] = "spotify-this-song")) {
  console.log("Good Work Marshall");
  console.log(song);
}

var spotify = new Spotify(keys.spotify);
// var URL = "" + song;

spotify
  .search({ type: 'track', query: song, limit: 3 })
  .then(function(response) {
    console.log((response));
  })
  .catch(function(err) {
    console.log(err);
  });
  let pay = process.argv.slice(3);

  if (pay = 'pay for 1 beer'){
      console.log('get 2 beers')
  }

// axios.get(URL).then(function(response) {
//     // Place the response.data into a variable, jsonData.
//     var jsonData = response.data;

// });
