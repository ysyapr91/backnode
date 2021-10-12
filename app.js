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

app.use(cors())

app.use('/', routes);

//Error handling
const wrapAsync = (fn) => (req, res, next) => fn(req, res, next).catch(next);
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

const port = 8081;

app.listen(port, function () {
    console.log('backnode start : http://localhost:' + port);
});