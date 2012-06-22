var Backbone = require('backbone');

exports.Tie = Backbone.Model.extend({

	defaults:{
		name     :"default",
		imageurl:"test",
		ratings  :[]
		
	},

	alreadyVoted:function( userVal, ratingsVal ){
		
		return false;
	},
	
	vote: function(rating){
		if (typeof rating !== "number")
			throw new TypeError("Rating must be a number!");
		this.set("ratings", this.get("ratings").concat(rating))

	},

	
	average:function(){
		var ratings = this.get("ratings");
		return ratings.length > 0 ? ratings.reduce(function(a, b) {
			return a+b;
		}) / ratings.length : null;
	}
});
