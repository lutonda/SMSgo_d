var User = require("../models/user");
var Station = require("../models/station");

exports.index = function(req, res, next) {
  res.render("api", { title: "Hey", message: "Hello there!" });
};

exports.stationAutehenticateByEmail = function(req, res, next) {
  var response = {};

  User.getByUsername(req.body.email, function(err, user) {
    if (err) throw err;
    if (!user)
      res.json({
        status: 401,
        message: "Unknow user"
      });
    else
      User.comparePassword(req.body.password, user.password, function(
        err,
        isMacth
      ) {
        if (err) throw err;
        if (isMacth) {
          var station = new Station(req.body.station);
          station.user = user;
          Station.create(station, function(err, station) {
            if (err) throw err;
            res.json({
              status: 200,
              message: "Welcome to RESTHub crafted with love!",
              station: station
            });
          });
        } else {
          res.json({
            status: 401,
            message: "wrong password"
          });
        }
      });
  });
};

exports.stationAutehenticateByApiKey = function(req, res, next) {
  var response = {};

  User.getByApiKey(req.body.apiKey, function(err, user) {
        if (err) throw err;
        if (user) {
          var station = new Station(req.body.station);
          station.user = user;
          Station.create(station, function(err, station) {
            if (err) throw err;
            res.json({
              status: 200,
              message: "Welcome to RESTHub crafted with love!",
              station: station
            });
          });
        } else {
          res.json({
            status: 401,
            message: "wrong Api Key"
          });
        }
      });
};

exports.stationSendsms = function(req, res) {

  const io = res.locals["socketio"];

  User.getByApiKey(req.query.apikey, function(err, user) {
    if (err) throw err;
    if (!user)
      res.json({
        status: 401,
        message: "Unknow user"
      });
    else
      Station.getByUser(user.id,function(err,stations){
        if(err) throw err;
        if(stations!==null)
        {
          if(stations.filter( x => x.key === req.query.phoneId).length>0){            
            io.emit(user.apikey+'--'+req.query.phoneId, req.query); 
            
            res.json({
              status: 200,
              message: "Success, Message sant",
            });

          }
          else
          res.json({
              status: 401,
              message: "Unknow station ID",
            });
        }
      })
  });
};
