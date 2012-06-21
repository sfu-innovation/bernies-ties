var Tie = require('./../models/tie.js');
var TieList = require('./tieList');



var data = [{"name":"Blue Steel", "url":"images/tie_1.jpg"},
			{"name":"Flying Hawaiian", "url":"images/tie_2.jpg"},
			{"name":"Red Barron", "url":"images/tie_3.jpg"},
			{"name":"Stripey", "url":"images/tie_4.jpg"}];

var ties = [];

var i;
for(i = 0; i < data.length; i++){
	var newTie = new Tie.Tie({name:data[i].name, imageurl:data[i].url});
	ties.push(newTie);
}

TieList.getList(function(list){
    var i;
    for(i = 0; i < list.length; i++){
        var newTie = new Tie.Tie({name:list[i].name, imageurl:list[i].url});
        ties.push(newTie);
    }
})

var getVote = function(vote) {
	console.log(vote);
}

exports.ties = ties;
