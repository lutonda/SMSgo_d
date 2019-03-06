exports.index = function(req, res) {
    res.render('home/index')
  };
  
exports.api =  function(req, res) {
        res.render('home/api')
}
  
exports.about =  function(req, res) {
        res.render('home/about')
}
    
exports.project =  function(req, res) {
        res.render('home/project')
}