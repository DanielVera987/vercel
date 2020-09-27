const express = require('express');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Users = require('../models/Users');
const { isAuthenticaded } = require('../auth/index')

const router = express.Router();

const signToken = (_id) => {
  return jwt.sign({ _id }, 'mi-secreto', {
    expiresIn: 60 * 60 * 24 * 365,
  })
}

router.post('/register', (req, res) => {
  const { email, password} = req.body
  crypto.randomBytes(16, (err, salt) => {
    const newSalt = salt.toString('base64');
    crypto.pbkdf2(password, newSalt, 10000, 64, 'sha1', (err, key) => {
      const encryptedPassword = key.toString('base64');
      Users.findOne({ email }).exec()
        .then(user => {
          if (user) {
            return res.send('El usuario ya existe')
          }
          Users.create({
            email,
            password,
            salt: newSalt
          }).then(() => {
            res.send('Usuario creado con exito')
          })
        })
    })
  })
})

router.post('/login', (req, res) => {
  const { email, password} = req.body 
  Users.findOne({email}).exec()
    .then(user => {
      if (!user) {
        return res.send('El usuario no existe')
      }
      crypto.pbkdf2(password, user.salt, 10000, 64, 'sha1', (err, key) => {
        const encryptedPassword = key.toString('base64')
        if (user.password === encryptedPassword) {
          const token = signToken(user_id)
          return res.send({ token })
        }
        return res.send('usuario y constraseña es incorrecta')
      })
    })
})

router.get('/me', isAuthenticaded, (req, res) => {
  res.send(req.user)
})

module.exports = router