const express = require('express');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { variables: { MONGO_URL } } = require('../../config');
const {logerror } = require("../helpers/logger");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("trust proxy", 1);

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

const sessionConfig = {
    store: MongoStore.create({
        mongoUrl: MONGO_URL,
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    }),
    cookie: {
        maxAge: 1000 * 60 * 60,
        sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax',
        secure: process.env.NODE_ENV === "production"
    },
    name: "nameSession",
    secret: process.env.SESSION_SECRET || 'session',
    resave: true,
    saveUninitialized: false,
};

app.use(cookieParser());
app.use(session(sessionConfig));

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