var fs = require('fs');
var config = JSON.parse(fs.readFileSync('package.json'));
var client = require('redis').createClient(config.database.port, config.database.host);
var Tie = require('../models/tie.js');
var ties = [];
var randomTie = [];

client.select(config.database["db-num"], function(err,result){
	if (err){

		console.log(err);
		return;
	}

});


exports.getTies = function(callback){

	console.log("GETTING TIES");
	//Get all the keys, then execute a get on each key
	client.keys("*", function(err, result){
		var keys = [];
		var i;
		var remaining;
		keys = result;
		remaining = keys.length;

		if (err){
			console.log(err);
			return;
		}


		for(i = 0; i < keys.length; i++){
			client.get(keys[i], function(err, a){
				var json = eval('(' + a + ')');
				var tie = new Tie.Tie(json);
				ties.push(tie);

				if(--remaining === 0){
					callback(ties);
				}
			});
		}


	});
}
exports.getRandomTie = function(callback){
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
			callback(new Tie.Tie(json));
		});

	});
}