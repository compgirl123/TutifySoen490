const User = require('../models/models').User;

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

    const { id, first_name, last_name , email} = req.body;

    if ((!id && id !== 0) || !first_name || !last_name || !email) {
        return res.json({
        success: false,
        error: 'INVALID INPUTS',
        });
    }
    data.first_name = first_name;
    data.last_name = last_name;
    data.email = email;
    data.id = id;
    data.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
};

// this method removes existing user in our database
exports.deleteUser = async function (req, res) {
    const { id } = req.body;
    User.findByIdAndRemove(id, (err) => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
};