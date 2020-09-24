const express = require('express');
const router = app.router();

router.get('/', (req, res) => {
  res.send('Hola orders desde get')
})

router.post('/', (req, res) => {
  res.send('Hola orders desde post')
})

module.exports = router