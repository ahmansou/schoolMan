const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;


const withAuth = function(req, res, next) {
  const token = req.header('authToken');
  const userType = req.header('userType');
  const action = req.header('action');
  // console.log('usertype:|' + userType + '|');
  if (action === 'signin') {
    next();
    return ;
  }
  else {
    if (!token) 
      return res.status(401).send('No token provided');
    else {
      if (action === 'profile') {
        try {
          const verified = jwt.verify(token, secret);
          req.user = verified;
          next();
          return ;
        } catch (err) {
          res.status(401).send('Invalid token');
        }
      }
      else if (userType && (userType === '0' || userType === 0)) {
        try {
          const verified = jwt.verify(token, secret);
          req.user = verified;
          next();
        } catch (err) {
          res.status(401).send('Invalid token');
        }
      }
      else {
          return res.status(400).send('Unauthorized access');
      }
    }
  }
}

module.exports = withAuth;