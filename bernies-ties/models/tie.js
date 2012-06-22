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
		if (isNaN(rating)){
			console.log("Rating must be a number!");
		}
		else{
			this.set("ratings", this.get("ratings").concat(rating))
		}
	},

	
	average:function(){
		var ratings = this.get("ratings");
		if(ratings.length > 0){
			
			var result = ratings.reduce(function(a, b) {
				return a+b;
				}) / ratings.length;

			return result.toFixed(2);

		}
		else{
			return null;
		}
	}
});
