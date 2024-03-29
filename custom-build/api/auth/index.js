const jwt = require('jsonwebtoken');
const Users = require('../models/Users');

const isAuthenticaded = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.sendStatus(403);
  }
  jwt.verify(token, 'mi-secreto', (err, decoded) => {
    const { _id } = decoded;
    Users.findOne({ _id }).exec()
      .then(user => {
        res.user = user;
        next()
      })
  })
}

const hasRole = role => (req, res, next) => {
  if (req.user.role === role) {
    return next()
  }

  res.sendStatus(403)
}

module.exports = {
  isAuthenticaded,
  hasRole
}