const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const groupSchema = new Schema ({
	name:				{ type: String, required: true },
	numberOfStudents:	{ type: Number, required: true },
	year:				{ type: Number, required: true },
}, {tumestamps: true});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;