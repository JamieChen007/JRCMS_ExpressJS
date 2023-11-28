require('express-async-errors');
const express = require('express');
const v1Router = require('./routes');
const unknownError = require('./middleware/error/unknownError');
const validationError = require('./middleware/error/validationError');
const notFoundError = require('./middleware/error/notFoundError');
const syntaxError = require('./middleware/error/syntaxError');
const castError = require('./middleware/error/castError');
const duplicateError = require('./middleware/error/duplicateError');

const app = express();

app.use(express.json());
app.use('/v1', v1Router);

app.use(notFoundError);
app.use(castError);
app.use(syntaxError);
app.use(duplicateError);
app.use(validationError);
app.use(unknownError);

module.exports = app;
