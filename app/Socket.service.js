var User = require('../models/user');
var Station = require('../models/station');
exports.send = async function(data,callback) {
  
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  switch(data.fn){
  case 'registerStation':
    User.getByApiKey(data.apiKey, function(err, user) {
            if (err) throw err;
            if (user) {
            var station = new Station(data.station);
            station.user = user;
            Station.create(station, function(err, station) {
                if (err) throw err;
                callback({
                    status: 200,
                    message: "Station created",
                    station: station,
                    id:station.phoneNumber
                })
            });
            } else 
            return callback({
                    status: 401,
                    message: "wrong Api Key"
                })
            
        });
  }
      

}
exports.receive = async function(data,callback) {
  
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  
}