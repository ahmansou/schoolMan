const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;


const withAuth = function(req, res, next) {
  const token = req.header('authToken');
  if (!token) return res.status(401).send('No token provided');
  try {
    const verified = jwt.verify(token, secret);
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).send('Invalid token');
  }
}

module.exports = withAuth;