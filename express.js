var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

var fs = require('fs');


//global variable for tweet data
var tweetinfo = []

//load the input file
fs.readFile('favs.json', 'utf8', function readFileCallback(err,data ){
  if(err){
    req.log.info('cannot load a file:' + fileFolder + '/' + _file_name)
    throw err;
  }
  else{
    tweetinfo = JSON.parse(data); //store data from JSON file in tweetinfo
  }
});
 

//get functions
//displays user info
app.get('/tweets', function(req, res) {
  res.send({tweetinfo: tweetinfo});
});

//Shows tweet info
app.get('/tweetinfo', function(req, res) {
  res.send({tweetinfo: tweetinfo});
});

//Shows searched tweets
app.get('/searchinfo', function(req, res){
});

//Post functions
//Posts created tweets
app.post('/tweetinfo', function(req, res) {
    var tweetText = req.body.newText;
    var splitText = tweetText.split(";"); //split the string in 2 so we get the ID and the text in 2 varaibles, split1 and split2
    var split1 = splitText[0]; //id
    var split2 = splitText[1]; //text
    var time = new Date().toLocaleDateString(); //get the date so we can see when the tweet was created.
    tweetinfo.push({
      id: split1,
      text: split2,
      created_at: time,
      user: {id: "na"},
      user: {name: "na"},
      user: {screen_name: "na"},
    })
});

//Posts searched tweets
app.post('/searchinfo', function(req, res) {
});
//used to update users screen name
app.put('/tweets/:name', function(req,res){
  var curName = req.params.name; 
  var newName = req.body.newName;
  tweetinfo.forEach(function(tweet,index){ //goes through all users to find target screen name to change
    if(tweet.user.name === curName){
      tweet.user.screen_name = newName; //changes old name to new name
    }
  });
  res.send('successful user update');
});

//Delete 
//I had the function working a while ago but now it does not seem to work after chaning some code. I have tried everything to get it to work but I can not
app.delete('/tweetinfo/:tweetid', function(req, res) {
  var delId = req.body.id;
  tweetinfo.forEach(function(tweet, index) {
    if (tweet.id === Number(delId)) { //if the target id is found
      tweetinfo.splice(index, 1); //delete tweet
    }
  });
    res.send('tweet deleted');
});

app.listen(PORT, function() {
  console.log('Server listening on ' + PORT);
});