var ties = require('../controllers/all_ties.js').ties;

/*
 * GET home page.
 */

exports.index = function(req, res){

	var randomTie = ties[Math.floor(Math.random() * ties.length)]; 

	res.cookie('rememberme', 'yes', { expires: new Date(Date.now() + 900000), httpOnly: true, secure: true });
	res.render('index', { title: 'Bernies Ties' , tie:randomTie})

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

exports.uploadTie = function(req, res) {
	res.render('upload_tie', {title: 'Upload Tie' });
}
