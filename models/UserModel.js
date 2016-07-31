
'use stricit';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	// Objectid = Schema.Type.ObjectId;
mongoose.promise = require('q').Promise;

var userSchema = new Schema({
	name: {type:String,required:true},
	mobileNumber : {type:String,required:false},
	emailId: {type:String,required:false},
	city: {type:String,required:true},
	movie: {type:String,required:true},
	theater: {type:String,required:true},
	date: {type:Date,required:false},
	url: {type:String,required:true}
});

// userSchema.index({mobileNumber: 1, movie:1, date:1},{unique:true});

var User = mongoose.model('User',userSchema);

// userSchema.pre('save',function(next){
	
// });
module.exports = User; 