const express = require('express');
const axios = require('axios');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 1820;
const db = require('./database/index.js');
const TourDates = require('./database/models/TourDates.js')





app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
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
  console.log('req.query.search_query: ', String(req.query.search_query))

  TourDates.find({
    artist: req.query.search_query
  }, (err, results) => {
    if (err) {
      return console.log('error getting from db: ', err)
    }
    res.json(results);
    console.log(results);
  })
  // .then((data) => {
  //   console.log('searchdata:', data)
  //   res.json(data);
  // })
  // .catch((err) => {
  //   res.status(404);
  //   res.send(`Could not conduct search for: ${req.query.search_query} in database`);
  // });
})

// post to user's list of events they are planning on attending

// app.post('/search', (req, res) => {
//   let searchTerm = req.body.data;
// })
// .then((searchTerm) => {
//   request.get
// })


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = app