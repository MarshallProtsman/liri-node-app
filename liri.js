require("dotenv").config();
const axios = require('axios')

let song = process.argv.slice(3).join('+')

if (process.argv[2] = "spotify-this-song") {
    console.log('Good Work Marshall');
    console.log(song)
}

var URL = "http://api.tvmaze.com/singlesearch/shows?q=" + song;


axios.get(URL).then(function(response) {
    // Place the response.data into a variable, jsonData.
    var jsonData = response.data;


});