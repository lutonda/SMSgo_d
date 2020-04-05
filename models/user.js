var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
const uuidv5 = require("uuid/v5");

const UserSchema = new mongoose.Schema({
  name: {
    type: String
  },
  username: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  apikey: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  stations:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Station'
  }],
  isActive: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

var User = (module.exports = mongoose.model("User", UserSchema));

module.exports.getStations = function(id){
  return station.find({user:id})
}

module.exports.getByUsername=function(email,callback){
  User.findOne({email:email},callback)
}

module.exports.getByApiKey=function(apiKey,callback){
  User.findOne({apikey:apiKey},callback)
}

module.exports.getById=function(id,callback){
  User.findById(id,callback);
}

module.exports.create = function(newUser, callback) {
  
  if(!newUser.name) newUser.name=newUser.email.split('@')[0];

  newUser.apikey = bcrypt.hashSync(uuidv5('http://sms.go/key', uuidv5.URL), bcrypt.genSaltSync(10));

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};
module.exports.comparePassword=bcrypt.compare
