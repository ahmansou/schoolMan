const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
	try {
		const token = req.header("token");
		if (!token)
			return res
				.status(401)
				.json({msg: "no token"});
		// const verified = jwt.verify(token, process.env.)
	} catch (error) {
		res
		.status(500)
		.json({msg: "no token"});
	}
};