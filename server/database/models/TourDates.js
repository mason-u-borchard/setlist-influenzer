const mongoose = require('mongoose');
const db = require('../index.js');
mongoose.Promise = global.Promise;


const tourDateSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  artist: String,
  date: String,
  location: String
}
);

const TourDates = mongoose.model('TourDates', tourDateSchema);
module.exports = TourDates;