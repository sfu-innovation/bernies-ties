var ties = require('../controllers/all_ties.js').ties;
/*
 * GET home page.
 */

exports.index = function(req, res){
	res.cookie('rememberme', 'yes', { expires: new Date(Date.now() + 900000), httpOnly: true, secure: true });
	res.render('index', { title: 'Bernies Ties' })
};

exports.allTies = function(req, res){
	console.log(ties);
	var tie_id = req.body.id,
		vote = req.body.vote;

	var cookie = req.session.cookie;

	for(i in ties) {
		if (ties[i].attributes.name === tie_id){
			ties[i].vote(cookie, vote);
			break;
		}
	}
	
	res.render('all_ties', { title: 'All Bernies Ties', ties: ties });
};
