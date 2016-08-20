
'use stricit';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	// Objectid = Schema.Type.ObjectId;
mongoose.promise = require('q').Promise;

var CrytoUtil = require('../utility/CryptoUtil.js');
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

function encrypter(next,done){
	if(this.emailId !== undefined && this.emailId !== null && this.emailId.trim() !== "")
		this.emailId = CrytoUtil.encrypt(this.emailId);
	if(this.mobileNumber !== undefined && this.mobileNumber !== null && this.mobileNumber.trim() !== "")
		this.mobileNumber = CrytoUtil.encrypt(this.mobileNumber);
	next();
}



function decrypter(records){
	records.forEach(function(item){
		if(item._doc.emailId !== undefined && item._doc.emailId !== null && item._doc.emailId.trim() !== "")
			item._doc.emailId = CrytoUtil.decrypt(item._doc.emailId);
		if(item._doc.mobileNumber !== undefined && item._doc.mobileNumber !== null && item._doc.mobileNumber.trim() !== "")
			item._doc.mobileNumber = CrytoUtil.decrypt(item._doc.mobileNumber);
	});
	/*if(this.emailId !== undefined && this.emailId !== null && this.emailId.trim() !== "")
		this.emailId = CrytoUtil.decrypt(this.emailId);
	if(this.mobileNumber !== undefined && this.mobileNumber !== null && this.mobileNumber.trim() !== "")
		this.mobileNumber = CrytoUtil.decrypt(this.mobileNumber);*/
}

userSchema.post('find',decrypter);

// userSchema.pre('findOne',encrypter);
userSchema.pre('save',encrypter);

var User = mongoose.model('User',userSchema);

module.exports = User;