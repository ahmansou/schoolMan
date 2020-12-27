const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const staffSchema = new Schema ({
	staffId:			{ type: String, required: true },
	username:			{ type: String, required: true },
	firstName:			{ type: String, required: true },
	lastName: 			{ type: String, required: true },
	dateOfBirth: 		{ type: Date, required: true },
	mobilePhone:		{ type: Number, required: true },
	telephone:			{ type: Number, required: true },
	address: 			{ type: String, required: true },
	email: 				{ type: String, required: true },
	role:				{ type: String, required: true },
	salary:				{ type: Number, required: true }
}, { timestamps: true });

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;