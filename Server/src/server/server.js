const express = require('express');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { variables: { MONGO_URL } } = require('../../config');
const { logerror } = require("../helpers/logger");
const setAuthAndCsrfCookies = require("../helpers/cookieAndCsrfToken/AuthAndCsrfCookies");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("trust proxy", 1);

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

app.use(cookieParser());

// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     store: MongoStore.create({ mongoUrl: MONGO_URL }),
//     cookie: { secure: process.env.NODE_ENV === 'production', httpOnly: true }
// }));

const csrfProtection = csrf({ cookie: true });

app.use((req, res, next) => {
    if (req.path === '/login' || req.path === '/register') {
        return next(); 
    }
    csrfProtection(req, res, next);
});

app.use((req, res, next) => {
    if (typeof res.csrfToken === 'function') {
        setAuthAndCsrfCookies(res);  
    }
    next();
});

const routerConfig = require('../routes/index');
app.use(routerConfig());

app.use((err, req, res, next) => {
    logerror.error(err.stack);
    res.status(err.status || 500).send({
        success: false,
        message: err.message || 'Internal Server Error',
        data: null
    });
});

module.exports = { app };
