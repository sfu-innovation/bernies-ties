
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Bernies Ties' })
};

exports.allTies = function(req, res){
  res.render('all_ties', { title: 'All Bernies Ties' })
};
