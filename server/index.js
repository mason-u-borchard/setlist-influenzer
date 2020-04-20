const express = require('express');
const axios = require('axios');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');
let cors = require('cors');
const app = express();
const PORT = 1820;
const db = require('./database/index.js');
const TourDates = require('./database/models/TourDates.js');
const SetList = require('./database/models/SetList.js')





app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });

app.get('/tourdates', (req, res) => {
  TourDates.find({})
  .then((data) => {
    res.send(data);
  })
  .catch((err) =>  {
    console.log('error getting tour dates: ', err);
  });
})

app.get('/search', (req, res) => {
  console.log('req.query: ', req.query);
  console.log('req.query.searchQuery: ', String(req.query.searchQuery))

  TourDates.find({
    artist: req.query.searchQuery
  }, (err, results) => {
    if (err) {
      return console.log('error getting from db: ', err)
    }
    res.json(results);
    console.log(results);
  })
})

// post to user's list of events they are planning on attending


app.post('/setlist', (req, res) => {
  console.log(JSON.stringify('req.body::::::::', req.body));
  var entry = req.body;
  SetList.create({
    artist: req.body.artist,
    user: req.body.user,
    songs: req.body.songs,
    upvotes: req.body.upvotes
  })
  .then((data) => {
    res.json(data);
  })
    .catch(function(err) {
      res.status(404);
      console.log(`Could not add new setlist entry to db, err:`);
      res.send(err);
    });
});

// delete req to delete entry from profile (most likely so they can redo it).


// put req to replace existing entry


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = app