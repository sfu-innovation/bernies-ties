var ties = require('../controllers/all_ties.js').ties;
/*
 * GET home page.
 */

exports.index = function(req, res){
	res.render('index', { title: 'Bernies Ties' })
};

exports.allTies = function(req, res){
	console.log(ties);
	var tie_id = req.query['id'],
		vote = req.query['vote'];

	for(i in ties) {
		if (ties[i].attributes.name === tie_id){
			ties[i].vote(1, vote);
			break;
		}
	}
	
	res.render('all_ties', { title: 'All Bernies Ties', ties: ties });
};
