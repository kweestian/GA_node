var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');

// this npm package will make retrieving from the api  much cleaner
var omdbApi = require('omdb-client');

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// set view engine to jade makes things cleaner
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



app.get('/', function(req, res) {
  res.render('index');
});

app.get('/searching', function(req, res) {
  // This is the title we get from user input
  var searchTitle = req.query.search;

  var params = {
    query: searchTitle
  };

  // here we use the npm package omdb-client to fetch data from the omdb server
  omdbApi.search(params, function(err, data) {
    if (err) {
      res.send(err);
      return;
    }
    res.send(data.Search);
  })
});

app.get('/favorites', function(req, res){
  var data = fs.readFileSync('./data.json');
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});

app.get('/addToFavorites', function(req, res){
  if(!req.query) {
    res.send("Error");
    return
  } else {
    var data = JSON.parse(fs.readFileSync('./data.json'));
    data.push(req.query);
    fs.writeFile('./data.json', JSON.stringify(data));
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  }
});

app.get('/result', function(req, res){

  var params = {
    title: "Terminator"
  }

  omdbApi.get(params, function(err, data) {
    if (!err) {
      res.send(data);
    } else {
      console.log(err);
      res.send("Error");
    }
  });
});

app.listen(3000, function(){
  console.log("Listening on port 3000");
});
