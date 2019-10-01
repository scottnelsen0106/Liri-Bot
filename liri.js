 require("dotenv").config();
 var keys = require("./keys.js");
 var axios = require("axios");
 var Spotify = require('node-spotify-api');
 var spotify = new Spotify(keys.spotify);
//  var omdbUrl =  "https://www.omdbapi.com/?i=tt3896198&apikey=5494fea7";
 var request = require("request");
//  var bandsInTownApi = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

var userInput = process.argv[2];
var otherInput = process.argv[3];

switch(userInput) {
  case("spotify-this-song"):
  if(otherInput){
    spotifyThisSong(otherInput)
  } else {
    spotifyThisSong("My Heart Will Go On");
  }
  break;
  case("movie-this"):
  if(otherInput){
    getMovies(otherInput)
  } else {
    getMovies("Mr. Nobody")
  }
}


//making a function for spotify this song
 function spotifyThisSong(song) {
 spotify.search({ type: 'track', query: song, limit: 1 }, function(error, data) {
    if (!error) {
      for(var i = 0; i < data.tracks.items.length; i++) {
       var songInfo = data.tracks.items[i]; 
      console.log("Artist: " + songInfo.artists[0].name);
      console.log("Song: " + songInfo.name)
      console.log("URL: " + songInfo.preview_url);
      console.log("Album: " + songInfo.album.name);
      console.log("--------------------------")
      }
    }
       else {
         console.log("Error occurred")
       }
      
  });
  
}


//making a function for movie-this

function getMovies(movieName) {
request("http://www.omdbapi.com/?apikey=5494fea7&t=" + movieName, function(error, response, movieResults) {
if (!error && response.statusCode == 200){
  var movieResults = JSON.parse(movieResults);
  console.log("Title: " + movieResults.Title);
  console.log("Release Year " + movieResults.Year);
  console.log("IMDB Rating: " + movieResults.imdbRating);
  console.log("Country: " + movieResults.Country);
  console.log("Language: " + movieResults.Language);
  console.log("Plot: " + movieResults.Plot);
  console.log("Actors: " + movieResults.Actors);
  console.log("Rotten Tomatoes Rating: " + movieResults.Ratings[1].Value);
  console.log("Rotten Tomatoes URL: " + movieResults.Website);
}
})
}
