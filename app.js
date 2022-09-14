const express = require('express');
const cors = require('cors');

const errorController = require('./controllers/errorController');
const employeeRouter = require('./routes/employeeRoutes');

const app = express();

app.use(
  cors({
    origin: ['http://localhost:3000', 'https://gopendrajangir.github.io'],
  })
);

app.use(express.json());

app.use('/employees', employeeRouter);

app.use('*', errorController);

module.exports = app;
