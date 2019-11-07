const Account = require('../models/models').Account;
const Student = require('../models/models').Student;
const Tutor = require('../models/models').Tutor;
var session = require('express-session');
// Nodejs encryption with CTR
const crypto = require('crypto');
const bcrypt = require('bcryptjs')
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

// this method fetches all available users in our database
exports.getUser = async function (req, res) {
    Student.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
};

// this method overwrites existing user in our database
exports.updateUser = async function (req, res) {
    const { id, update } = req.body;
    Student.findByIdAndUpdate(id, update, (err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
};


// this method overwrites existing user in our database
exports.updateUserInfo = async function (req, res) {
    const { _id, school,program_of_study,education_level,first_name,last_name } = req.body;
    Student.findByIdAndUpdate(_id,
        {$set: { "school" : school,  "program_of_study":program_of_study, "education_level": education_level, 
                 "first_name": first_name,"last_name":last_name } },
        { "new": true, "upsert": true },
        (err, user) => {
            if (err) return res.json({ success: false, error: err });
            //update the session
            req.session.userInfo = user;       
            req.session.save( function(err) {
                req.session.reload( function (err) {
                    //session reloaded
                    return res.json({ success: true, userInfo: user });
                });
            });       
        }
    );
};

// this method assigns a tutor to the user & vice-versa
exports.assignTutor = async function (req, res) {
    const { student_id, tutor_id } = req.body;

    Student.findByIdAndUpdate(student_id,
        { "$push": { "tutors": tutor_id } },
        { "new": true, "upsert": true },
        function (err) {
            if (err) throw err;
        }
    );

    Tutor.findByIdAndUpdate(tutor_id,
        { "$push": { "students": student_id } },
        { "new": true, "upsert": true },
        function (err) {
            if (err) throw err;
        }
    );
}

// this function encrypts the password for security reasons
exports.encrypt = function (text) {
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

// this function decrpyts the password for use in the login page
exports.decrypt = function (text) {
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

// this method adds new user in our database
exports.putUser = async function (req, res) {
    let account = new Account();
    let data = new Student();
    var encrypted_password = "";
    const { id, first_name, last_name, program_of_study, email, password, school, school_name_other, education_level } = req.body;

    // this method encrypts the password in order to maximize security for our application
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            console.log(err);
        } else {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) {
                    console.log(err);
                } else {
                    encrypted_password = hash;
                    if ((!id && id !== 0) || !first_name || !last_name || !email || !password || !program_of_study || !education_level || !school) {
                        return res.json({
                            success: false,
                            error: 'INVALID INPUTS',
                        });
                    }

                    // Create account
                    account.email = email;
                    account.password = encrypted_password;
                    account.save(function (err, acc) {
                        if (err) return res.json({ success: false, error: err });

                        // Create user profile 
                        data.account = acc.id;
                        data.first_name = first_name;
                        data.last_name = last_name;
                        data.program_of_study = program_of_study;
                        data.education_level = education_level;
                        data.school = school;
                        data.id = id;
                        data.save(function (err, user) {
                            if (err) return res.json({ success: false, error: err });

                            // Update account with user id
                            Account.updateOne({ _id: acc._id },
                                { user_profile: user._id },
                                function (err) { if (err) console.log(err) });

                        });
                        return res.json({ success: true });
                    });
                }
            });
        }
    });

};

exports.authUser = async function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var profile_id = [];

    Account.findOne({ email: email }, function (err, user) {
        if (err) {
            console.log(err);
            return res.status(500).send();
        }
        else if (user == undefined) {
            console.log('user not found');
            req.session.isLoggedIn = false;

            req.session.save();
            res.send(req.session);

            return res.status(400).send();
        }
        else {
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    console.log('server error');
                }

                else if (isMatch === true) {
                    req.session.email = user.email;

                    //req.session.program_of_study = user.program_of_study;
                    console.log(null, 'login successfully');
                    if (user.user_profile) {
                        Student.findOne({ _id: user.user_profile }, function (err, user1) {
                            req.session.userInfo = user1;
                            req.session.isLoggedIn = true;
                            req.session.save();
                            res.send(req.session);
                            return res.status(200).send();
                        });
                    }
                    else {

                        Tutor.findOne({ _id: user.tutor_profile }, function (err, user1) {
                            //req.session.reload();
                            req.session.userInfo = user1;
                            req.session.isLoggedIn = true;
                            req.session.save();
                            res.send(req.session);

                            return res.status(200).send();
                        });
                    }

                }
                else {
                    console.log('login info incorrect');
                    req.session.isLoggedIn = false;

                    req.session.save();
                    res.send(req.session);

                    return res.status(400).send();
                }
            });
        }

    })
};

//this function logs the user out and destroys the session
exports.logout = async function (req, res) {
    req.session.destroy();
};

//this function checks if a session is running
exports.checkSession = async function (req, res) {
    if (req.session.isLoggedIn) {
        res.send(req.session);
    }

};


// this method removes existing user in our database
exports.deleteUser = async function (req, res) {
    const { id } = req.body;
    Student.findByIdAndRemove(id, (err) => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
};

// this method fetches the courses associated with the current user
exports.getUserCourses = async function (req, res) {
    Student.findOne({ _id: req.session.userInfo._id }).populate('courses').
        exec(function (err, student) {
            if (err) return handleError(err);        
            return res.json({ success: true, data: student.courses });
        });
};