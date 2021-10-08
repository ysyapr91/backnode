const createError = require('http-errors');
const express = require('express');
const expressErrorHandler = require('express-error-handler');
const app = express();
const routes = require('./routes');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const cors = require('cors')

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(expressSession({
    secret: 'secretkey',
    resave: true,
    saveUninitialized: true
}));

global.dbPool = require('./config/db_connect.js');

app.use(cors())

app.use('/', routes);

const port = 8081;

app.listen(port, function () {
    console.log('Example app listening on port : ' + port);
});