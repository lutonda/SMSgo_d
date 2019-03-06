exports.index=function(req, res, next) {
    
    res.render("about", { title: "Hey", message: "Hello there!" , hostName: req.headers.host});
  }
  