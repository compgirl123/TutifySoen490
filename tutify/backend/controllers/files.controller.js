
const Files = require('../models/models').Files;
var multer = require('multer');
var mongoose = require('mongoose');
var uuidv4 = require('uuid/v4');
var bp = require("body-parser");
const DIR = './../public/';


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, DIR);
  },
  filename: (req, file, cb) => {
      const fileName = file.originalname.toLowerCase().split(' ').join('-');
      cb(null, uuidv4() + '-' + fileName)
  }
});

exports.upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    cb(null, true); 
  }
});

exports.uploadFile= async (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const file = new Files();
  //console.log(req.body);
  file.name = req.body.name;
  file.adminTutor = req.body.adminTutor;
  file.url = "http://localhost:3000/"+req.file.filename;
  file.encryptedName = req.file.filename;
  file.save().then(result => {
      res.status(201).json({
          message: "File uploaded successfully!",
          fileCreated: {
              _id: result._id,
              file: result.file
          }
      })
  }).catch(err => {
      console.log(err),
          res.status(500).json({
              error: err
          });
  });

    
}

// this method fetches all files accounts in our database
exports.getFiles = async function (req, res) {
  Files.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
}

// this method fetches all files accounts in our database
exports.uploadFiles = async function (req, res) {
  Files.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
}


