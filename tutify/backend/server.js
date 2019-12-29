const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const router = require('./routes');
var session = require('express-session');
var multer = require('multer');
const GridFsStorage = require("multer-gridfs-storage");
const crypto = require('crypto');
const API_PORT = 3001;
const app = express();
const path = require("path");
app.use(cors({credentials: true, origin: true}));

// this is our MongoDB databases
const filesRoute = 
  'mongodb+srv://app:Mdfi8g6IMFagCOOE@tutify-q6b06.mongodb.net/filesDb?retryWrites=true&w=majority';
const dbRoute =
  'mongodb+srv://app:Mdfi8g6IMFagCOOE@tutify-q6b06.mongodb.net/tutify?retryWrites=true&w=majority';

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true, useUnifiedTopology: true });
// connection

let db = mongoose.connection;

// // connection with file databaseconst 
// conn = mongoose.createConnection(filesRoute, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });
let gfs;
const conn = db.once('open', () => {
   // init stream
   gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads"
  });
  console.log('connected to the database');
});
 // Storage
 const storage = new GridFsStorage({
  url: dbRoute,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads"
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({
  storage
});

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
app.post('/uploadFile', upload.single('file'),(req, res) => {
  res.redirect("/uploadingDocs");
});

// file upload requirements
app.use(express.json());
app.set("view engine", "ejs");

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
