var Tie = require('./../models/tie.js');

var data = [{"name":"Blue Steel", "url":"http://img.alibaba.com/img/pb/310/378/300/300378310_920.JPG"},
			{"name":"Flying Hawaiian", "url":"http://i2i.qinzhi.com/wp-content/uploads/2011/04/Neck-Tie.jpg"}];

var ties = [];

var i;
for(i = 0; i < data.length; i++){
	var newTie = new Tie.Tie({name:data[i].name, url:data[i].url});
	ties.push(newTie);
}

exports.ties = ties;