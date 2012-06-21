var fs = require('fs');
var config = JSON.parse(fs.readFileSync('package.json'));
var client = require('redis').createClient(config.database.port, config.database.host);
var Tie = require('./models/tie.js');
var ties = require('./controllers/hardcoded-ties.js');

client.select(config.database["db-num"], function(err, result){

	if (err){
		console.log(err);
		return;

	}

});

client.on('error', function(err){
	console.log("Error: " + err);
})

ties.on("ready", function(ties){

	var i;
	for(i = 0; i < ties.length; i++){
		var tie = ties[i];

		client.set(ties[i].get("name"), JSON.stringify(tie), function(){
			console.log("item inserted");
		});
	}

	client.save();
	console.log("Records saved: " + ties.length);

	client.end(); 
})



