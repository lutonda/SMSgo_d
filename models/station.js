var mongoose = require("mongoose");

const StationSchema = new mongoose.Schema({
  phoneNumber: {
    type: Number
  },
  model: {
    type: String
  },
  deviceCountry:{
    type: String
  },
  systemName: {
    type: String
  },
  systemVersion: {
    type: String
  },
  key: {
    type: String,
    required: true,
  },
  user: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

var Station = (module.exports = mongoose.model("Station", StationSchema));

module.exports.create = function(station, callback) {
  station.key=genkey()
  station.save(callback);
};

module.exports.getByUser=function(id,callback){
  Station.find({user:id},callback)
}
module.exports.getById=function(id,callback){
  Station.findById(id,callback);
}

function genkey(){
  var alpha=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','X','Y','Z']
  if(Math.floor(Math.random() * 2)===0)
    return alpha[Math.floor(Math.random() * alpha.length)]+Math.floor(Math.random() * 10)
  else
    return Math.floor(Math.random() * 10)+alpha[Math.floor(Math.random() * alpha.length)]
}