 require("dotenv").config();
 var keys = require("./keys.js");
 var axios = require("axios");
 var Spotify = require('node-spotify-api');
 var spotify = new Spotify(keys.spotify);
//  var ombdUrl =  "https://www.omdbapi.com/?i=tt3896198&apikey=5494fea7";
 var request = require("request");
//  var bandsInTownApi = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

 
 spotify.search({ type: 'track', query: "run this town" }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data.tracks.items[1]); 
//   JSON.parse(data.tracks.items[0]);
  });
