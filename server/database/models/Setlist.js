const mongoose = require('mongoose');
const db = require('../index.js');
mongoose.Promise = global.Promise;


const setlistSchema = new mongoose.Schema({
  artist: String,
  location: String,
  venue: String,
  user: String,
  songs: Array,
  upvotes: {type: Number, default: 0}
}
);

const Setlist = mongoose.model('Setlist', setlistSchema);
module.exports = Setlist;