const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const router = require('./backend/routes');
var session = require('express-session');
const API_PORT = 8080;
const app = express();
const path = require("path");
app.use(cors({credentials: true, origin: true}));

// only made for logging and bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

//express cookie-session middleware
app.use(session({secret:"sdshkgjdhgkhgkjsd322k3j4nkjkjhb3", resave:false, saveUninitialized: true}))

// append /api for our http requests
app.use('/api', router);
app.use('/public', express.static('public'));

// file upload requirements
app.use(express.json());
app.use(express.static(path.join(__dirname, "./build")));
app.set("view engine", "ejs");

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./build/index.html"))
});

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
