const router = require('express').Router();
let Group = require('../models/group.model');

router.route('/').get((req, res) => {
	Group.find()
		.then(groups => res.json(groups))
		.catch(err => res.status(400).json(`Err: ${err}`))
})

router.route('/add').post((req, res) => {
	const [name, numberOfStudents, year] = [req.body.name, req.body.numberOfStudents, req.body.year];

	const newGroup = new Group({
		name, numberOfStudents, year
	});

	newGroup.save()
		.then(() => res.json('Group Added'))
		.catch(err => res.status(400).json(`Err: ${err}`));
})

router.route('/:id').delete((req, res) => {
	Group.findByIdAndDelete(req.params.id)
		.then(() => res.json('Group deleted'))
		.catch(err => res.status(400).json(`Err: ${err}`));
})

module.exports = router;