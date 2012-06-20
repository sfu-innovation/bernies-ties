var ties = require('../controllers/all_ties.js').ties;
/*
 * GET home page.
 */

exports.index = function(req, res){
	res.render('index', { title: 'Bernies Ties' })
};

exports.allTies = function(req, res){
	console.log(ties);
	res.render('all_ties', { title: 'All Bernies Ties', ties: ties });
};
