exports.sendSMS=function(req, res, next) {
    var apikey=req.query.apikey;
    var phonId=req.query.phonId;
    var message=req.query.message
    var to=req.query.to;
    const io = res.locals['socketio']
    io.emit('update','hello world');
    io.emit('new-message',{message:message,to:to});
    
    res.json({ title: "Hey", message: "Hello there!" ,query: req.query});
  }
  