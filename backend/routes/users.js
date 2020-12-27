const router = require('express').Router();
const jwt = require('jsonwebtoken');
let User = require('../models/user.model');
const withAuth = require('../middleware');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

router.route('/').get((req, res) => {
	// withAuth(req, res);
	User.find()
		.then(users => res.json(users))
		.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	const userType = req.body.userType;
	const userId = req.body.userId;

	const newUser = new User({
		username,
		password,
		userType,
		userId
	});

	newUser.save()
		.then(() => res.json('User added'))
		.catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').get((req, res) => {
	User.findById(req.params.id)
		.then(User => res.json(User))
		.catch(err => res.status(400).json('Error: ' + err));
})
router.route('/:id').delete((req, res) => {
	// withAuth(req, res);
	User.findByIdAndDelete(req.params.id)
		.then(() => res.json('User deleted'))
		.catch(err => res.status(400).json('Error: ' + err));
})

router.route('/update/:id').post((req, res) => {
	User.findById(req.params.id)
		.then(user => {
			user.username = req.body.username;
			user.password = req.body.password;
			user.userType = req.body.userType;
			user.userId = req.body.userId;

			user.save()
				.then(() => res.json('User updated'))
				.catch(err => res.status(400).json('Error: ' + err));
		})
		.catch(err => res.status(400).json('Error: ' + err));
})

router.route('/signin').post((req, res) => {
	const { username, password } = req.body;
	User.findOne({ username }, function(err, user) {
		const id = user._id;
		const userType = user.userType;
	  if (err) {
		console.error(err);
		res.status(500)
		  .json({
		  error: 'Internal error please try again'
		});
	  } else if (!user) {
		res.status(401)
		  .json({
			error: 'Incorrect username or password'
		  });
	  } else {
		user.isCorrectPassword(password, function(err, same) {
		  if (err) {
			res.status(500)
			  .json({
				error: 'Internal error please try again'
			});
		  } else if (!same) {
			res.status(401)
			  .json({
				error: 'Incorrect username or password'
			});
		  } else {
			// Issue token
			const payload = { username, id, userType };
			const token = jwt.sign(
				payload,
				secret,
			);
			res.header('authToken', token)
			.json({
				// payload: payload,
				username: username,
				_id: id,
				userType: userType,
				success: true,
				secret: secret,
				authToken: token
			});
			// .cookie('token', token, { httpOnly: true })
			// .sendStatus(200);
			// sendToken()
			// res.cookie('token', token, { httpOnly: true }).sendStatus(200);
		  }
		});
	  }
	});
  });


module.exports = router;