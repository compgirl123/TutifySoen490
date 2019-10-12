const Data = require('../models/models').Data;

// TEST DATA

// this method fetches all available data in our database
exports.getData = async function (req, res) {
    Data.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
};
  
// this method overwrites existing data in our database
exports.updateData = async function (req, res) {
    const { id, update } = req.body;
    Data.findByIdAndUpdate(id, update, (err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
};

// this method removes existing data in our database
exports.deleteData = async function (req, res) {
    const { id } = req.body;
    Data.findByIdAndRemove(id, (err) => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
};

// this method adds new data in our database
exports.putData = async function (req, res) {
    let data = new Data();

    const { id, message } = req.body;

    if ((!id && id !== 0) || !message) {
        return res.json({
        success: false,
        error: 'INVALID INPUTS',
        });
    }
    data.message = message;
    data.id = id;
    data.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
};