 require("dotenv").config();
 var keys = require("./keys.js");
 var axios = require("axios");
 var Spotify = require('node-spotify-api');
 var spotify = new Spotify(keys.spotify);
 var request = require("request");
 var moment = require("moment");
 var fs = require("fs");

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
  break;
  case"concert-this":
  concertThis(otherInput)
  break;
case"doThis":
doWhatItSays()
break;
}


//making a function for spotify this song
 function spotifyThisSong(song) {
 spotify.search({ type: 'track', query: song, limit: 20 }, function(error, data) {
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


//Making a function for concert-this
function concertThis(artist) {
axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
  .then(function (response) {
    console.log("Venue:" + response.data[0].venue.name);
    console.log("Location:" + response.data[0].venue.city);
    var date = (moment(response.data[0].datetime).format("MM/DD/YYYY"));
    console.log("Date:", date)
    
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
}


//Writing a function for doThis
function doWhatItSays() {

  fs.readFile("random.txt", "utf8", function(error, data){

     var dataArr = data.split(",");

     spotifyThisSong(dataArr[1]);
  })
}