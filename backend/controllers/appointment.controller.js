const Appointment = require('../models/models').Appointment;

// this method fetches all available appointments in our database
exports.getAppointment = async function (req, res) {
    Appointment.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
};

// this method overwrites existing appointment in our database
exports.updateAppointment = async function (req, res) {
    const { id, update } = req.body;
    Appointment.findByIdAndUpdate(id, update, (err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
};

// this method adds new appointment in our database
exports.putAppointment = async function (req, res) {
    let data = new Appointment();

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

// this method removes existing appointment in our database
exports.deleteAppointment = async function (req, res) {
    const { id } = req.body;
    Appointment.findByIdAndRemove(id, (err) => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
};