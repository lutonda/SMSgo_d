var User=require('../models/user')
var Station=require('../models/station')
var qrcode = require('qrcode')

exports.index = function(req, res) {
    let str='';
    
    Station.getByUser(req.user.id,function(err,stations){
        req.user.stations=stations
        qrcode.toDataURL(req.user.apikey).then(qrc => { 
            res.render('user/index',{stations:stations.length===0,userQr:qrc})
        })
    })

  };
  
exports.api =  function(req, res) {
        res.render('user/api')
}
  
exports.job =  function(req, res) {
    const io = res.locals["socketio"];
    
    io.emit(req.user.apikey+'--'+req.body.station, req.body);
    res.redirect('./')
}
    
exports.stationConnect =  function(req, res) {
        res.render('user/project')
}