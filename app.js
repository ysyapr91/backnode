var createError = require('http-errors');
const express = require('express');
const app = express();
const routes = require('./routes');

app.use('/', routes);

const port = 8081;

app.listen(port, function () {
    console.log('Example app listening on port : ' + port);
});