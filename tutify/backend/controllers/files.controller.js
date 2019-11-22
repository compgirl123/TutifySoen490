const Files = require('../models/models').Files;
var multer = require('multer');
var mongoose = require('mongoose');
var uuidv4 = require('uuid/v4');

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

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
          cb(null, true);
      } else {
          cb(null, false);
          return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
  }
});

exports.testUpload= (req, res, next) => {
  const url = req.protocol + '://' + req.get('host')
  const user = new User({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      profileImg: url + '/public/' + req.file.filename
  });
  user.save().then(result => {
      res.status(201).json({
          message: "User registered successfully!",
          userCreated: {
              _id: result._id,
              profileImg: result.profileImg
          }
      })
  }).catch(err => {
      console.log(err),
          res.status(500).json({
              error: err
          });
  })
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


