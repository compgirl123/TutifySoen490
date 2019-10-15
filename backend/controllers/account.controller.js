const Account = require('../models/models').Account;

// this method fetches all available accounts in our database
exports.getAccount = async function (req, res) {
    Account.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
}

// this method overwrites existing account in our database
exports.updateAccount = async function (req, res)  {
    const { id, update } = req.body;
    Account.findByIdAndUpdate(id, update, (err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
};

// this method adds new account in our database
exports.putAccount = async function (req, res) {
    let data = new Account();

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

// this method removes existing account in our database
exports.deleteAccount = async function (req, res) {
    const { id } = req.body;
    Account.findByIdAndRemove(id, (err) => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
};