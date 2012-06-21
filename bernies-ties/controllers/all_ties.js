var fs = require('fs');
var config = JSON.parse(fs.readFileSync('package.json'));
var client = require('redis').createClient(config.database.port, config.database.host);
var Tie = require('../models/tie.js');
var ties = [];
var keys = [];

client.select(config.database["db-num"], function(){});

client.keys("*", function(err, result){
	keys = result;
	
	var i;
	for(i = 0; i < keys.length; i++){
		client.get(keys[i], function(err, a){
			var json = eval('(' + a + ')');
			var tie = new Tie.Tie(json);
			ties.push(tie);
		});
	}

	//Not sure how to properly stop the client	
	client.get(keys[0], function(err, a){
		client.end();
	});
});



exports.ties = ties;
