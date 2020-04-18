const db = require('./index.js');
var TourDates = require('./models/TourDates.js');
var data = require('./data/tour_data.js');

var seedDb = function (data) {
  TourDates.insertMany(data, (err, docs) => {
    if (err) {
      console.log(`Error populating db ${err}`);
      return;
    }
    console.log('Done populating db with data such as:', data[0]);
  });
};



seedDb(data);


module.exports = seedDb;