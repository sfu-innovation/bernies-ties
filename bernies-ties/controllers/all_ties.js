var Tie = require('./../models/tie.js');

var data = [{"name":"Blue Steel", "url":"images/tie_1.jpg"},
			{"name":"Flying Hawaiian", "url":"images/tie_2.jpg"},
			{"name":"Red Barron", "url":"images/tie_3.jpg"},
			{"name":"Stripey", "url":"images/tie_4.jpg"}];

var ties = [];

var i;
for(i = 0; i < data.length; i++){
	var newTie = new Tie.Tie({name:data[i].name, url:data[i].url});
	ties.push(newTie);
}

exports.ties = ties;