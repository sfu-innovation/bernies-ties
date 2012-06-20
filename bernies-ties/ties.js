var Tie = require('./models/tie.js');

var data = [{"name":"Blue Steel", "url":"http://img.alibaba.com/img/pb/310/378/300/300378310_920.JPG"},
			{"name":"Flying Hawaiian", "url":"http://i2i.qinzhi.com/wp-content/uploads/2011/04/Neck-Tie.jpg"},
			{"name":"Red Barron", "url":"http://farm5.staticflickr.com/4093/4743691751_535e378bcb.jpg"},
			{"name":"Stripey", "url":"http://farm3.staticflickr.com/2553/5805325185_e4e8d05eb5_z.jpg"}];

var ties = [];

var i;
for(i = 0; i < data.length; i++){
	var newTie = new Tie.Tie({name:data[i].name, url:data[i].url});
	ties.push(newTie);
}

exports.ties = ties;