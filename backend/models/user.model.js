const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const saltRounds = 10;

const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		length: 8
	},
	password: { type: String, required: true },
	userType : { type: Number, required: true }, //0 : admin, 1 : staff, 2: teacher, 3: student, 4: parent
	userId: { type: String, required: true },
}, { timestamps: true, });

UserSchema.pre('save', function(next){
	// console.log("chihaka");
	if (this.isNew || this.isModified('password')) {
		const document = this;
		bcrypt.hash(document.password, saltRounds, function(err, hashedPassword) {
			if (err) {
				next(err);
			}
			else {
				document.password = hashedPassword;
				next();
			}
		});
	} else {
		next();
	}
});

UserSchema.methods.isCorrectPassword = function(password, callback){
	bcrypt.compare(password, this.password, function(err, same) {
		if (err) {
			callback(err);
		} else {
			callback(err, same);
		}
	});
}

const User = mongoose.model('User', UserSchema);

module.exports = User;