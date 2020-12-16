const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const parentSchema = new Schema ({
	nid:			{ type: String, required: true}, //national id
	username:		{ type: String, required: true},
	firstName: 		{ type: String, required: true},
	lastName: 		{ type: String, required: true},
	dateOfBirth: 	{ type: Date, required: true},
	gender: 		{ type: String, required: true },
	address: 		{ type: String, required: true},

	mobilePhone:	{ type: Number, required: false},
	homePhone: 		{ type: Number, required: false},
	email: 			{ type: String, required: false},
	profession:		{ type: String, required: false},
}, {timestamps: true});

const Parent = mongoose.model('Parent', parentSchema);

module.exports = Parent;