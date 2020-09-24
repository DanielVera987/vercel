const express = require('express');
const router = app.router();

router.get('/', (req, res) => {
  res.send('Hola mels desde get')
})

router.post('/', (req, res) => {
  res.send('Hola mels desde post')
})

module.exports = router