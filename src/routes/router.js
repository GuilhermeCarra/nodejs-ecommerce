// config variables
const config = require('../config/app-config.js');

// express initialization
const express = require("express");
const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// required libraries
require('dotenv').config();
const helmet = require('helmet')
app.use(helmet())

// static folder
app.use(express.static(config.root));

// routes
app.use('/', require('./main.js'))
app.use('/login', require('./login.js'))
app.use('/dashboard', require('./dashboard.js'))
app.use('/ajax', require('./ajax.js'))

// server initialization
app.listen(process.env.APP_PORT, () => console.log('Server is running'));
