const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/influenzers';
const TourDates = require('./models/TourDates.js')

const db = mongoose.connect(mongoUri, function(err, success) {
  if (err) {
    console.log('error connecting to mongoDB: ', err);
  } else {
    console.log('connected to mongoDB');
  }
});

module.exports = db;


