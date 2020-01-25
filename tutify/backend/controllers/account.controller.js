const Account = require('../models/models').Account;

// this method fetches all available accounts in our database
exports.getAccount = async function (req, res) {
    Account.find((err, data) => {
        if (err) {
            console.error("Could not find the account");
            return res.json({ success: false, error: err });
        }
        console.info("Account found");
        return res.json({ success: true, data: data });
    });
}

// this method overwrites existing account in our database
exports.updateAccount = async function (req, res) {
    const { id, update } = req.body;
    Account.findByIdAndUpdate(id, update, (err) => {
        if (err) {
            console.error("Could not update the account, account not found");
            return res.json({ success: false, error: err });
        }
        console.info("Account is updated");
        return res.json({ success: true });
    });
};

// this method adds new account in our database
exports.putAccount = async function (req, res) {
    let data = new Account();

    const { id, message } = req.body;

    if ((!id && id !== 0) || !message) {
        console.error("Missing account id");
        return res.json({
            success: false,
            error: 'INVALID INPUTS',
        });
    }
    data.message = message;
    data.id = id;
    data.save((err) => {
        if (err) {
            console.error("An error occured when saving the new account to the database");
            return res.json({ success: false, error: err });
        }
        console.info("New account has been created and stored with success");
        return res.json({ success: true });
    });
};

// this method removes existing account in our database
exports.deleteAccount = async function (req, res) {
    const { id } = req.body;
    Account.findByIdAndRemove(id, (err) => {
        if (err){ 
            console.error("The delete order was given, but was not executed by the database. This may be due to a connection error.");
            return res.send(err);
        }
        console.info("The account has been deleted");
        return res.json({ success: true });
    });
};