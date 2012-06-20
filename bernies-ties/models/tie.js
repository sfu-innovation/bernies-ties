var Backbone = require('backbone');

exports.Tie = Backbone.Model.extend({

	defaults:{
		name     :"default",
		imageurl:"test",
		ratings  :[],
		
	},
	initialize:function(){
		var ratings_array = new Array();
		this.set({ ratings : ratings_array });
	},
	
	// do we want users to be able to change their ratings?
	vote:function( rating ){
	    var ratings_array = this.get("ratings");
	    ratings_array.push( rating );
	    this.set({ ratings: ratings_array });
	},
	
	average:function(){
		var ratings_array = this.get("ratings");
		var ratingsum = 0;
		var length = ratings_array.length;
		if ( length == 0 ){
			return;
		}
		for ( var i = 0; i < length; i++){
			ratingsum += parseInt(ratings_array[i]);
		}
		return ratingsum /  ratings_array.length;
	}
});
