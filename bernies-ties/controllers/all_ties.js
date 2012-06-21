var fs = require('fs');
var config = JSON.parse(fs.readFileSync('package.json'));
var client = require('redis').createClient(config.database.port, config.database.host);
var Tie = require('../models/tie.js');
var ties = [];
var keys = [];
var randomTie = [];

client.select(config.database["db-num"], function(err,result){
	if (err){

		console.log(err);
		return;
	}

});

client.keys("*", function(err, result){
	if (err){
		console.log(err);
		return;


	}

	keys = result;

	var i;
	for(i = 0; i < keys.length; i++){
		client.get(keys[i], function(err, a){
			var json = eval('(' + a + ')');
			var tie = new Tie.Tie(json);
			ties.push(tie);
		});
	}

	//This chooses a random tie, but onle once per server start
	//Still don't know how to stop client on time, so I'll leave this in
	client.randomkey(function(err,key){
		if (err){
			console.log(err);
			return;

		}
		client.get(key, function(err, a){
			if (err){
				console.log(err);
				return;

			}

			var json = eval('(' + a + ')');
			randomTie.push(new Tie.Tie(json));
		});

	});

});


exports.ties = ties;
exports.randomTie = randomTie;
