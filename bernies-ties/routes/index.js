
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

exports.viewTies = function(req, res){
	res.render('all_ties', { title: 'Tie List'})
};