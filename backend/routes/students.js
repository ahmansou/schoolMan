const router = require('express').Router();
let Student = require('../models/student.model');

router.route('/').get((req, res) => {
	Student.find()
		.then(students => res.json(students))
		.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
	const nid = req.body.nid;
	const sid = req.body.sid;
	const username = req.body.username;
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const dateOfBirth = Date.parse(req.body.dateOfBirth);
	const startYear = Number(req.body.startYear);
	const gender = req.body.gender;
	const address = req.body.address;
	const numTel = Number(req.body.numTel);
	const email = req.body.email;
	const parentId = req.body.parentId;
	const groupId = req.body.groupId;
	const classId = req.body.classId;

	const newStudent = new Student({
		nid,
		sid,
		username,
		firstName,
		lastName,
		dateOfBirth,
		startYear,
		gender,
		address,
		numTel,
		email,
		parentId,
		groupId,
		classId
	});

	newStudent.save()
		.then(() => res.json('Student added'))
		.catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').get((req, res) => {
	Student.findById(req.params.id)
		.then(student => res.json(student))
		.catch(err => res.status(400).json('Error: ' + err));
})

router.route('/search/:searchQuery').get((req, res) => {
	Student.find(
		{$or:[
			{"username": {"$regex" : req.params.searchQuery}},
			{"firstName": {"$regex" : req.params.searchQuery}},
			{"lastName": {"$regex" : req.params.searchQuery}}
		]}
		)
	.then(students => res.json(students))
	.catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').delete((req, res) => {
	Student.findByIdAndDelete(req.params.id)
		.then(() => res.json('Student deleted'))
		.catch(err => res.status(400).json('Error: ' + err));
})

router.route('/update/:id').post((req, res) => {
	Student.findById(req.params.id)
		.then(student => {
			student.nid = req.body.nid;
			student.sid = req.body.sid;
			student.username = req.body.username;
			student.firstName = req.body.firstName;
			student.lastName = req.body.lastName;
			student.dateOfBirth = Date.parse(req.body.dateOfBirth);
			student.startYear = Number(req.body.startYear);
			student.gender = req.body.gender;
			student.address = req.body.address;
			student.numTel = Number(req.body.numTel);
			student.email = req.body.email;
			student.parentId = req.body.parentId;
			student.groupId = req.body.groupId;
			student.classid = req.body.classid;

			student.save()
				.then(() => res.json('Student updated'))
				.catch(err => res.status(400).json('Error: ' + err));
		})
		.catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;