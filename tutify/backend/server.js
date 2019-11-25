const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const router = require('./routes');
var session = require('express-session');

const API_PORT = 3001;
const app = express();
app.use(cors({credentials: true, origin: true}));

// this is our MongoDB database
const dbRoute =
  'mongodb+srv://app:Mdfi8g6IMFagCOOE@tutify-q6b06.mongodb.net/tutify?retryWrites=true&w=majority';

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// only made for logging and bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

//express cookie-session middleware
app.use(session({secret:"sdshkgjdhgkhgkjsd322k3j4nkjkjhb3", resave:false, saveUninitialized: true}))

// append /api for our http requests
app.use('/api', router);
app.use('/public', express.static('public'));

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
