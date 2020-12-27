const router = require('express').Router();
let Staff = require('../models/staff.model');

router.route('/').get((req, res) => {
	Staff.find()
		.then(staffs => res.json(staffs))
		.catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post((req, res) => {
	const staffId = req.body.staffId;
	const username = req.body.username;
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const dateOfBirth = Date.parse(req.body.dateOfBirth);
	const mobilePhone = Number(req.body.mobilePhone);
	const telephone = Number(req.body.telephone);
	const address = req.body.address;
	const email = req.body.email;
	const role = req.body.role;
	const salary = Number(req.body.salary);

	const newStaff = new Staff({
		staffId,
		username,
		firstName,
		lastName,
		dateOfBirth,
		mobilePhone,
		telephone,
		address,
		email,
		role,
		salary
	});

	newStaff.save()
		.then(() => res.json('Staff added'))
		.catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').get((req, res) => {
	Staff.findById(req.params.id)
		.then(staff => res.json(staff))
		.catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').delete((req, res) => {
	Staff.findByIdAndDelete(req.params.id)
		.then(() => res.json('Staff deleted'))
		.catch(err => res.status(400).json('Error: ' + err));
})

router.route('/update/:id').post((req, res) => {
	Staff.findById(req.params.id)
		.then(staff => {
			staff.staffId = req.body.staffId;
			staff.username = req.body.username;
			staff.firstName = req.body.firstName;
			staff.lastName = req.body.lastName;
			staff.dateOfBirth = Date.parse(req.body.dateOfBirth);
			staff.mobilePhone = Number(req.body.mobilePhone);
			staff.telephone = Number(req.body.telephone);
			staff.address = req.body.address;
			staff.email = req.body.email;
			staff.role = req.body.role;
			staff.salary = Number(req.body.salary);
			
			staff.save()
				.then(() => res.json('Staff updated'))
				.carch(err => res.status(400).json('Error: ' + err));
		})
		.carch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;