var 
	fs = require('fs'),
	//ties = require('../controllers/all_ties.js').ties;
	tieList = require('../controllers/all_ties.js');
var config = JSON.parse(fs.readFileSync('config.json'));
var client = require('redis').createClient(config.database.port, config.database.host);
var Tie = require('../models/tie.js');
var EventEmitter = require('events').EventEmitter;

client.select(config.database["db-num"], function(){});

/*
 * GET home page.
 */

exports.index = function(req, res){

	tieList.getRandomTie(function(randomTie){

		res.cookie('rememberme', 'yes', { expires: new Date(Date.now() + 900000), httpOnly: true, secure: true });
		client.set(randomTie.get("name"), JSON.stringify(randomTie));
		res.render('index', { title: 'Bernies Ties' , tie:randomTie})

	});
};

exports.allTies = function(req, res){	

	
	tieList.getTies(function(ties){

		var out = function(){
			var test = Object.getOwnPropertyNames(ties).map(function(name){

				return ties[name];
			});
			console.log(Object.getOwnPropertyNames(test));
		//	test.pop();
			test.sort(function(a,b) { 
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

			res.render('all_ties', { title: 'All Bernie\'s Ties', ties: test });
		}
\
		if (req.method === 'POST') {
			var tie_id = req.body.id,
				vote = req.body.vote,
				cookie = req.session.cookie;

			console.log(tie_id);
			console.log(Object.getOwnPropertyNames(ties));

			ties[tie_id].vote(cookie,vote);
			client.set(ties[tie_id].get("name"), JSON.stringify(ties[tie_id]), function(err){
				out();
			})
		}
		else {
			out();
		}

/*
		for(i in ties) {
			if (ties[i].attributes.name === tie_id){
				console.log(ties[i].attributes.ratings);
				ties[i].vote(cookie, vote);
				console.log(ties[i].attributes.ratings);

				console.log("!!");
			//	console.log("got vote for tie"+ ties[i].attributes.ratings)
				client.set(ties[i].get("name"), JSON.stringify(ties[i]), function(err){

				});
				console.log("!!!!!");
				client.get(ties[i], function (err, result) {
					console.log(eval(result));
				});
				break;
			}
		}*/
	
		

	});
};


exports.searchTies = function(req, res){
	//http://localhost:3000/search/red
	var keyword;
	if (!req.params.k){
		keyword = "";
	}
	else {keyword = req.params.k}
	tieList.searchTies(req.params.k,function(ties){



		//TODO: large block code copied from above, I suggest move these into controller as private method. Router is not a place to do serious programing.

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

		res.render('all_ties', { title: 'Search Results' , ties:ties})

	});


};




exports.uploadTie = function(req, res) {
	console.log("in upload");
	res.render('upload_tie', {title: 'Upload Tie' });
	}

	
exports.uploadSuc = function(req, res){
	console.log("upload received");
	
	var tie_name = req.body.name;
	var tie_picture = req.files.upload.path
	console.log(req.body.name);
			
	console.log("parsing done");
	var filepath = ("./public/images/" + req.files.upload.name)
    var tiefilepath = ("./images/" + req.files.upload.name)
    fs.rename(req.files.upload.path, filepath , function(err) {
       if (err) {
       	   console.log("Error uploading file: "+err)
       	   console.log("Move "+req.files.upload.path+" to "+filepath)
	       fs.unlink(filepath);
	       fs.rename(req.files.upload.path, filepath);
	       return
	   }
	   console.log("YAY DONE");
	   var newTie = new Tie.Tie({name:tie_name, imageurl:tiefilepath});
	   client.set(newTie.get("name"),JSON.stringify(newTie), function(){
	   	console.log("Tie created")
	   });


	});
	 
	res.render('upload_suc', {title: 'Tie Uploaded' });
   	

	
}
