const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/influenzers';
const TourDates = require('./models/TourDates.js')

const db = mongoose.connect(mongoUri);

module.exports = db;


