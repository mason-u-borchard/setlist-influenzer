const express = require('express');
const axios = require('axios');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = 8888;
const db = require('./database/index.js');
const TourDates = require('./database/models/TourDates.js');
const Setlist = require('./database/models/SetList.js')





app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

/////////////////////////
///// GET reqs here /////
////////////////////////


/// get all tour dates for all artists

app.get('/tourdates', (req, res) => {
  TourDates.find({})
  .then((data) => {
    res.send(data);
  })
  .catch((err) =>  {
    console.log('error getting tour dates: ', err);
  });
})


/// get all tour dates for a specific artist
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

/// gets all posted setlists for  artist at that show
app.get('/setlist-for', (req, res) => {

  Setlist.find({
    artist: req.query.artist,
    venue: req.query.venue
  }, )
    .then((data) => {
      res.send(data);
      console.log('data for artist at venue: ', data)
    })
    .catch(function(err) {
      console.log('Error trying to find data for the artists setlist submissions at a specific show:' + err);
      res.status(404);
    });
});


/// gets all posted setlists for artist in general
app.get('/setlists-artist', (req, res) => {
  console.log('req.query.artist', req.query.artistQuery);
  // console.log('req.query', req.query);
  // console.log('req.params', req.params);

    Setlist.find({
      artist: req.query.artistQuery
    }, (err, results) => {
      if (err) {
        return console.log('error getting all setlists for an artist from db: ', err)
      }
      res.json(results);
      console.log('results[0]', results[0]);
    })
      // .then((data) => {
      //   res.send(data);
      //   console.log('setlist data for a specfic artist in general', data);
      // })
      // .catch(function(err) {
      //   console.log('Error trying to find data for the artists setlist submissions. ' + err);
      //   res.status(404);
      // });
  });

////// get average setlist for a particular artist at a specific venue

  app.get('/setlists-artist-pm', (req, res) => {
    Setlist.find({
      artist: req.query.artist,
      location: req.query.location,
      venue: req.query.venue
    })
      .then((data) => {
        res.send(data);
        console.log('setlist data for a specfic artist in general', data);
      })
      .catch(function(err) {
        console.log('Error trying to find data for the artists setlist submissions. ' + err);
        res.status(404);
      });
  });


  /////////////////////////
///// POST reqs here /////
////////////////////////

// post to user's list of events they are planning on attending
app.post('/setlist', (req, res) => {
  Setlist.create({
    artist: req.body.artist,
    user: req.body.user,
    songs: req.body.songs,
    upvotes: req.body.upvotes
  })
  .then((data) => {
    res.send(data);
  })
    .catch(function(err) {
      res.status(404);
      console.log(`Could not add new setlist entry to db, err: ${err}`);
      res.send(err);
    });
});

// post to db based on typed query (good for populating db manually using postman)
app.post('/setlistquery', function(req, res) {
  console.log(JSON.stringify('req.query', req.query));
  Setlist.create(req.query)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      res.status(404);
      console.log('Could not post new setlist query');
    });
});

// delete req to delete entry from profile (most likely so they can redo it).


// put req to replace existing entry


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = app