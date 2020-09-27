'use strict'
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const meals = require('./routes/meals');
const orders = require('./routes/orders');
const auth = require('./routes/auth');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); 

mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api/meals', meals)
app.use('/api/orders', orders)
app.use('/api/auth', auth)

module.exports = app;