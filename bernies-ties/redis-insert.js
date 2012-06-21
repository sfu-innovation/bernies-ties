var fs = require('fs');
var config = JSON.parse(fs.readFileSync('package.json'));
var client = require('redis').createClient(config.database.port, config.database.host);
var Tie = require('./models/tie.js');
var ties = require('./controllers/hardcoded-ties.js').ties;

client.select(config.database["db-num"], function(){});


console.log("Ties list is " + ties.length);

var i;
for(i = 0; i < ties.length; i++){
	console.log(i);

	var tie = ties[i];

	client.set(ties[i].get("name"), JSON.stringify(tie), function(){
		//console.log(ties[i].get("name") + " set.");
	});
	
	client.info(function(err, info){
		console.log("ERROR " + info);
	});
}



//Not sure how to properly end client on time
//So I'll just leave this here
client.get(ties[0].get("name"), function(err, a){
	client.end();
});

