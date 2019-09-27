const User = require('../models/models').User;
var session = require('express-session');


// this method fetches all available users in our database
exports.getUser = async function (req, res) {
    User.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
};

// this method overwrites existing user in our database
exports.updateUser = async function (req, res) {
    const { id, update } = req.body;
    User.findByIdAndUpdate(id, update, (err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
};

// this method adds new user in our database
exports.putUser = async function (req, res) {
    let data = new User();

    const { id, first_name, last_name , email, education_level, classes_tutored, type_tutoring} = req.body;

    if ((!id && id !== 0) || !first_name || !last_name || !email || !education_level|| !classes_tutored || !type_tutoring) {
        return res.json({
        success: false,
        error: 'INVALID INPUTS',
        });
    }
    data.first_name = first_name;
    data.last_name = last_name;
    data.email = email;
    data.education_level = education_level;
    data.classes_tutored = classes_tutored;
    data.type_tutoring = type_tutoring;
    data.id = id;
    data.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
};
//this method authenticates login of a user
exports.authUser = async function (req,res){
    var email = req.body.email;
    var first_name = req.body.first_name;
   

    newUser.findOne({ email:email, first_name:first_name} , function(err,user){
    if(err){
        console.log(err);

        return res.status(500).send();

    }
    if(user){
        req.session.user = user;
        req.session.isLoggedIn = true;
        req.session.save();
        res.send(req.session);

        return res.status(200).send;

    }
    req.session.isLoggedIn = false;

    return res.status(400).send();

    })
};



exports.logout = async function(req,res){
        if (req.session.user) {
          req.session.destroy();
          res.redirect('/login');
        } else {
          res.redirect('/login');
        }
};


// this method removes existing user in our database
exports.deleteUser = async function (req, res) {
    const { id } = req.body;
    User.findByIdAndRemove(id, (err) => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
};