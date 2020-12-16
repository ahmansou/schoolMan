const router = require('express').Router();
let Parent = require('../models/parent.model');

router.route('/').get((req, res) => {
	Parent.find()
		.then(parents => res.json(parents))
		.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
	const nid = req.body.nid;
	const username = req.body.username;
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const dateOfBirth = Date.parse(req.body.dateOfBirth);
	const gender = req.body.gender;
	const address = req.body.address;

	const mobilePhone = Number(req.body.mobilePhone);
	const homePhone = Number(req.body.homePhone);
	const email = req.body.email;
	const profession = req.body.profession;

	const newParent = new Parent({
		nid,
		username,
		firstName,
		lastName,
		dateOfBirth,
		gender,
		address,
		mobilePhone,
		homePhone,
		email,
		profession,
	});

	newParent.save()
		.then(() => res.json('Parent added'))
		.catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').get((req, res) => {
	Parent.findById(req.params.id)
		.then(parent => res.json(parent))
		.catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').delete((req, res) => {
	Parent.findByIdAndDelete(req.params.id)
		.then(() => res.json('Parent deleted'))
		.catch(err => res.status(400).json('Error: ' + err));
})

router.route('/update/:id').post((req, res) => {
	Parent.findById(req.params.id)
		.then(parent => {
			parent.nid = req.body.nid;
			parent.username = req.body.username;
			parent.firstName = req.body.firstName;
			parent.lastName = req.body.lastName;
			parent.dateOfBirth = Date.parse(req.body.dateOfBirth);
			parent.gender = req.body.gender;
			parent.address = req.body.address;
			parent.mobilePhone = Number(req.body.mobilePhone);
			parent.homePhone = Number(req.body.homePhone);
			parent.email = req.body.email;
			parent.profession = req.body.profession;

			parent.save()
				.then(() => res.json('Parent updated'))
				.catch(err => res.status(400).json('Error: ' + err));
		})
		.catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;