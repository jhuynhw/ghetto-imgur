const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sessions = require('express-session');
const mysqlSessions = require('express-mysql-session')(sessions);

//import handlebars
var handlebars = require('express-handlebars');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// var dbRouter = require('./routes/dbtest');
var errorPrint = require('./helpers/debug/debugprinters').errorPrint;
var requestPrint = require('./helpers/debug/debugprinters').requestPrint;

var app = express();

app.engine(
    "hbs",
    handlebars({
        layoutsDir: path.join(__dirname,"views/layouts"),
        partialsDir: path.join(__dirname,"views/layouts/partials"),
        extname: ".hbs",
        defaultLayout: "home",
        helpers: {
            /**
             * if you need more helpers you can
             * register them here
             */
        }
    })
);

var mysqlSessionStore = new mysqlSessions({/* uses default option */}, require('./config/database'));

app.use(sessions({
    key: "csid",
    secret: "super secret key",
    store: mysqlSessionStore,
    resave: false,
    saveUninitialized: false
}))

// set out express app template engine to handlebars
app.set("view engine", "hbs");
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, 'public')));

// prints URL on every request
app.use((req, res, next) => {
    requestPrint(req.url);
    next();
});

app.use((req, res, next) => {
    console.log(req.session);
    if(req.session.username) {
        res.locals.logged = true;
    }
    next();
})

// localhost:3000
app.use('/', indexRouter);
// app.use('/dbtest', dbRouter);
app.use('/users', usersRouter);

app.use((err, req, res, next) => {
    console.log(err);
    res.render('error', {err_message: err})
});

app.use((err, req, res, next) => {
    res.status(500);
    res.send('something went wrong with your db');
})
module.exports = app;