require("dotenv").config();

var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");
var keys = require("./keys.js");
var userInput = process.argv;
var songName = ""


if (userInput[2] === "do-what-it-says") {
    read();
}

else if (userInput[2] === "spotify-this-song") {
    acquireSongs();
}

else if(userInput[2] === "my-tweets"){
    acquireTweets();
}

else if(userInput[2] === "movie-this")
    acquireMovies();


function acquireTweets() {

    var client = new Twitter(keys.twitter);
    var query = ""

    if (userInput[3] === "" || userInput[3] === undefined) {
        console.log("\n Wrong Page");
        query = "Money23Green"
    } 

    else if (userInput.length -3 > 1) {
        var array = []
        for (var i = 3; i < userInput.length;i++) {
            array.push(userInput[i]);
        }

        query = array.join("");

    }

    else {

        query = userInput[3]

    }

    var params = { screen_name: query };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < 20; i++) {
                console.log("\n --------------")
                console.log(tweets[i].created_at);
                console.log(tweets[i].text);
                console.log("\n --------------");
            }
        } else {
            console.log("\n-----------------");
            console.log("\n Try Again");
            console.log("\n------------------");
        }

    })
}

function acquireSongs () {

if (userInput[3] === "" || userInput[3] === undefined) {
        console.log("\n Wrong Page");
        songName = "The Sign"
    } 

for (var i = 3; i < userInput.length; i++) {
    if (i > 3 && i < userInput.length) {
        songName = songName + "+" + userInput[i]
    }
    else {
        songName += userInput[i]
    }
}

inside();

}
function inside() {
    var spotify = new Spotify(keys.spotify);
spotify.search({ type: 'track', query: songName }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
for (var i = 0; i < data.tracks.items.length;i++){
    console.log(data.tracks.items[i].artists[0].name); 
    console.log(data.tracks.items[i].name)
    console.log(data.tracks.items[i].external_urls.spotify)
    console.log(data.tracks.items[i].album.name)
    console.log("----------------------------")
    }
});

}
function acquireMovies () {

var movieName = ""
// ...

for (var i = 3; i < userInput.length; i++) {
    if (i > 3 && i < userInput.length) {
        movieName = movieName + "+" + userInput[i]
    }
    else {
        movieName += userInput[i]
    }
}

    request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

        if (!error && response.statusCode === 200) {

    console.log("Title: " + JSON.parse(body).Title);
    console.log("Year: " + JSON.parse(body).Year);
    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value)
    console.log("Country: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors)
}
});
}

function read () {
    fs.readFile("./random.txt", "utf8", function(error, data){
            if (error) {
                return console.log(error);
            } else {

            console.log(data);
            var dataArr = data.split(",");
            songName = dataArr[1]
            inside();
        }

    })
}