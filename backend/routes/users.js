const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
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

router.route('/:id').delete((req, res) => {
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


module.exports = router;