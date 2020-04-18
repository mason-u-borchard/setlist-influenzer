const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const PORT = 1820;
const db = require('./database/index.js');





app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


app.get('/search/shows', (req, res) => {
  TourDates.findAll({artist: req.query}, (err, data) => {
    res.send(data)
    if (err) {
      return console.log('error getting from db: ', err)
    }
    console.log('results: ', data)
  })
})



app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = app