var ties = require('../controllers/all_ties.js').ties;

/*
 * GET home page.
 */

exports.index = function(req, res){
	res.render('index', { title: 'Bernie\'s Ties' })
};

exports.allTies = function(req, res){
	var tie_id = req.query['id'],
		vote = req.query['vote'];

	for(i in ties) {
		if (ties[i].attributes.name === tie_id){
			ties[i].vote(1, vote);
			break;
		}
	}
	
	//console.log(ties);
	
	
	ties.sort(function(a,b) { 
		//console.log("a = " + a.attributes.name);
		//console.log("b = " + b.attributes.name);

		var first_element = a.average();
		var second_element = b.average();

		if (!first_element) {
			first_element = 0;
		}

		if (!second_element) {
			second_element = 0;
		}
		
		return parseFloat(second_element) - parseFloat(first_element) 		
	});


	res.render('all_ties', { title: 'All Bernie\'s Ties', ties: ties });
};
