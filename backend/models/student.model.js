const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema ({
	nid:			{ type: String, required: true}, //national id
	sid:			{ type: String, required: true}, //school id
	username:		{ type: String, required: true},
	firstName: 		{ type: String, required: true},
	lastName: 		{ type: String, required: true},
	dateOfBirth: 	{ type: Date, required: true},
	startYear:		{ type: Number, required: true},
	gender: 		{ type: String, required: true },
	address: 		{ type: String, required: true},

	numTel: 		{ type: Number, required: false},
	email: 			{ type: String, required: false},
	// foreign keys
	parentId: 		{ type: String, required: true},
	groupId: 		{ type: String, required: true},
	classId: 		{ type: String, required: true},
}, {timestamps: true});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;