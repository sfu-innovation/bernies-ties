var Backbone = require('backbone');

exports.Tie = Backbone.Model.extend({

	defaults:{
		name     :"default",
		imageurl:"test",
		ratings  :[]
		
	},
	initialize:function(){
		var ratings_array = new Array();
		this.set({ ratings : ratings_array });
	},

	alreadyVoted:function( userVal, ratingsVal ){
		
		return false;
	},
	
	vote:function( userVal, ratingsVal ){
		if ( ratingsVal < 1 || ratingsVal > 10 ) {
			return ratingsVal;
		}
		var ratings_array = this.get("ratings");
		var length = ratings_array.length;
		for ( var i = 0; i < length ; i++){
			if ( ratings_array[i].user == userVal ){
				ratings_array[i].rating = ratingsVal;
				this.set( { ratings : ratings_array } );
			
				return true;
			}
		}
	    ratings_array.push( { user : userVal, rating: ratingsVal } );
	    this.set( { ratings : ratings_array } );

	},

	
	average:function(){
		var ratings_array = this.get("ratings");
		var ratingsum = 0;
		var length = ratings_array.length;
		if ( length == 0 ){
			return null;
		}
		for ( var i = 0; i < length; i++){
			ratingsum += parseInt(ratings_array[i].rating);
		}

		return (ratingsum /  ratings_array.length).toFixed(2);
	}
});
