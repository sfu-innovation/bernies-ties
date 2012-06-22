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
		if ( isNaN(rating) ){
			console.log("Rating must be a number");
			//throw new TypeError("Rating must be a number!");
			//need error handling to use throw new TypeError
			return;
		}
		else if(rating < 1 || rating >5){
			console.log("Rating must be between 1 - 5");
			//throw new TypeError("Rating must be a number!");
			//need error handling to use throw new TypeError
			return;
		}

		this.set("ratings", this.get("ratings").concat(rating))

	},

	
	average:function(){
		var ratings = this.get("ratings");
		return ratings.length > 0 ? ratings.reduce(function(a, b) {
			return a+b;
		}) / ratings.length : null;
	}
});
