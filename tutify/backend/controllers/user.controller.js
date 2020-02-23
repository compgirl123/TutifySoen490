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
var mongoose = require('mongoose');
const nodemailer = require("nodemailer");

// this method fetches all available users in our database
exports.getUser = async function (req, res) {
    Student.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
};

// this method fetches all the tutors the user is registered with
exports.getUsersTutors = async function (req, res) {
    var id = [];
    for (var x = 0; x < req.session.userInfo.tutors.length; x++) {
        id.push(req.session.userInfo.tutors[x]._id);
    }
    Tutor.find({ _id: { $in: id } }, function (err, data) {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
};

// this method resets a user's password
exports.resetPassword = async function (req, res) {
    const { password, resetPasswordToken } = req.body;
    var success = true;

    Tutor.findOne({ resetPasswordToken: resetPasswordToken }, function (err, tutor) {
        if (err) {
            console.log("Error while trying to authentificate the user (database request failed)");
            return res.status(500).send();
        }

        if (tutor) {
            if (tutor.resetPasswordExpires > Date.now()) {
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) {
                        console.log(err);
                    } else {
                        bcrypt.hash(password, salt, (err, hash) => {
                            if (err) {
                                console.log(err);
                            }

                            Account.findByIdAndUpdate({ _id: tutor.account },
                                { $set: { "password": hash } },
                                { "new": true, "upsert": true },
                                function (err) {
                                    if (err) throw err;
                                });
                                console.info("Password was updated in the database.");
                            return res.json({ success: true, data: success });
                        });
                    };
                });
            }
            else {
                console.info("Unable to save password in the database because token has expired.");
                success = false;
                return res.json({ success: false, data: success });
            }
        }
        else {
            Student.findOne({ resetPasswordToken: resetPasswordToken }, function (err, student) {
                if (err) {
                    console.log("Error while trying to authentificate the user (database request failed)");
                    return res.status(500).send();
                }
                if (student) {

                    if (student.resetPasswordExpires > Date.now()) {
                        bcrypt.genSalt(10, (err, salt) => {
                            if (err) {
                                console.log(err);
                            } else {
                                bcrypt.hash(password, salt, (err, hash) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                    Account.findByIdAndUpdate({ _id: student.account },
                                        { $set: { "password": hash } },
                                        { "new": true, "upsert": true },
                                        function (err) {
                                            if (err) throw err;
                                        });
                                    console.info("Password was updated in the database.");
                                    return res.json({ success: true, data: success });
                                });
                            };
                        });
                    }
                    else {
                        console.info("Unable to save password in the database because token expired.");
                        success = false;
                        return res.json({ success: false, data: success });
                    }
                }
                else {
                    console.info("Unable to locate user.");
                    success = false;
                    return res.json({ success: false, data: success });
                }
            });
        }

    });
};

// this method sends an email to the user concerning reset password
exports.forgotPassword = async function (req, res) {
    const { email, host } = req.body;

    var success = true;
    var token = "";
    var date = Date.now() + 6 * 3600000;
    crypto.randomBytes(16, (err, buf) => {
        if (err) {
            return reject(err);
        }
        token = buf.toString('hex');
    });
    Account.findOne({ email: email }, function (err, user) {
        if (err) {

            console.log("Error while trying to authentificate the user (database request failed)");
            return res.status(500).send();
        }
        //if user exists in database, send email using nodemailer
        if (user) {

            Tutor.findOne({ email: user.email }, function (err, tutor) {
                if (err) {

                    console.log("Error while trying to authentificate the user (database request failed)");
                    return res.status(500).send();
                }
                if (tutor) {
                    var _id = user.tutor_profile;

                    Tutor.findByIdAndUpdate(_id,
                        { $set: { "resetPasswordToken": token, "resetPasswordExpires": date } },
                        { "new": true, "upsert": true },
                        function (err) {
                            if (err) throw err;
                        });
                    console.info("The resetPasswordToken and resetPasswordExpires was saved in the database");
                }
                else {

                    Student.findOne({ email: user.email }, function (err, student) {
                        if (err) {

                            console.log("Error while trying to authentificate the user (database request failed)");
                            return res.status(500).send();
                        }
                        var _id = user.user_profile;

                        Student.findByIdAndUpdate(_id,
                            { $set: { "resetPasswordToken": token, "resetPasswordExpires": date } },
                            { "new": true, "upsert": true },
                            function (err) {
                                if (err) throw err;

                            });
                        console.info("The resetPasswordToken and resetPasswordExpires was saved in the database");
                    });
                };
            });

            var smtpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'tutifytutoring@gmail.com',
                    pass: 'moalawami'
                }
            });

            var mailOptions = {
                to: user.email,
                from: '"Tutify" <tutifytutoring@gmail.com>',
                subject: 'Tutify Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://' + host + '/resetpassword/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            smtpTransport.sendMail(mailOptions, function (err) {
                console.info("Email was sent using Nodemailer");
                return res.json({ success: true, data: success });
            });

        }
        else {
            console.info("Email could not be sent using Nodemailer");
            success = false;
            return res.json({ success: false, data: success });
        }
    });
};

// this method finds students in the database given the object id
exports.findStudents = async function (req, res) {
    var count = 0;
    const { students } = req.body;
    var users = [];

    for (var z = 0; z < students.length; z++) {
        Student.findOne({ _id: students[z] }, function (err, user1) {
            if (err) {

            };
            users.push(user1)
            count++;

            if (count == students.length) {

                return res.json({ success: true, data: users });
            }

        });
    }
};


// this method finds tutors in the database given the object id
exports.findTutors = async function (req, res) {
    var count = 0;
    const { tutors } = req.body;
    var users = [];

    for (var z = 0; z < tutors.length; z++) {
        Tutor.findOne({ _id: tutors[z] }, function (err, user1) {
            users.push(user1)
            count++;

            if (count == tutors.length) {
                return res.json({ success: true, data: users });
            }

        });
    }
};

// this method overwrites existing user info in our database
exports.updateUserInfo = async function (req, res) {
    const { _id, school, program_of_study, education_level, first_name, last_name } = req.body;
    Student.findByIdAndUpdate(_id,
        {
            $set: {
                "school": school, "program_of_study": program_of_study, "education_level": education_level,
                "first_name": first_name, "last_name": last_name
            }
        },
        { "new": true, "upsert": true },
        (err, user) => {
            if (err) return res.json({ success: false, error: err });
            //update the session
            req.session.userInfo = user;
            req.session.save(function (err) {
                if (err) {
                    console.error("The session was unable to be saved");
                    return res.json({ success: false, error: err });
                }
                console.info("The session was able to be saved");
                req.session.reload(function (err) {
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

    Tutor.findByIdAndUpdate(tutor_id,
        { "$push": { "students": student_id } },
        { "new": true, "upsert": true },
        function (err, tutor) {
            if (err) throw err;

            Student.findByIdAndUpdate(student_id,
                { "$push": { "tutors": tutor_id } },
                { "new": true, "upsert": true },
                function (err, user) {
                    if (err) throw err;

                    //update the session
                    req.session.userInfo.tutors.push(tutor);
                    req.session.save(function (err) {
                        if (err) {
                            console.error("The session was unable to be saved");
                            return res.json({ success: false, error: err });
                        }
                        console.info("The session was able to be saved");
                        req.session.reload(function (err) {
                            // session reloaded
                        });
                    });
                }
            );
        }
    );
}

// this method assigns a course to the user & a student to the course for the tutor
exports.assignCourse = async function (req, res) {
    const { student_id, tutor_id, course_id } = req.body;

    let newCourse = {
        course: course_id,
        tutor: tutor_id,
    }

    Tutor.findOne({ _id: tutor_id }).then(tutor => {
        // Add student to list for the specific course
        tutor.courses.forEach((course) => {
            if (course.course == course_id) {
                course.students.push(student_id)
            }
        });
        tutor.save();

        // Student side
        Student.findByIdAndUpdate(student_id,
            { "$push": { "courses": newCourse } },
            { "new": true, "upsert": true },
            function (err, user) {
                if (err) throw err;

                //update the session
                req.session.userInfo.courses.push(newCourse);
                req.session.save(function (err) {
                    if (err) {
                        console.error("The session was unable to be saved");
                        return res.json({ success: false, error: err });
                    }
                    console.info("The session was able to be saved");
                    req.session.reload(function (err) {
                        // session reloaded
                    });
                });
            }
        );
    }).catch(err => {
        console.log(err)
    });
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
                        data.todos = []
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
            console.info("Error while trying to authentificate the user (database request failed)");
            return res.status(500).send();
        }
        else if (user == undefined) {
            console.warn('User not found');
            req.session.isLoggedIn = false;

            req.session.save();
            res.send(req.session);

            return res.status(400).send();
        }
        else {
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    console.error('server error');
                }

                else if (isMatch === true) {
                    req.session.email = user.email;
                    console.info(null, 'login successfully');
                    if (user.user_profile) {
                        Student.findOne({ _id: user.user_profile }).populate('tutors').
                            exec(function (err, user1) {
                                req.session.userInfo = user1;
                                req.session.isLoggedIn = true;
                                req.session.save();
                                res.send(req.session);
                                return res.status(200).send();
                            });
                    }
                    else {
                        Tutor.findOne({ _id: user.tutor_profile }, function (err, user1) {
                            req.session.userInfo = user1;
                            req.session.isLoggedIn = true;
                            req.session.save();
                            res.send(req.session);
                            return res.status(200).send();
                        });
                    }

                }
                else {
                    console.warn('login info incorrect');
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
    } else {
        res.status(400).send(new Error('User not logged in.'));
    }
};

// this method removes existing user in our database
exports.deleteUser = async function (req, res) {
    const { id } = req.body;
    Student.findByIdAndRemove(id, (err) => {
        if (err) {
            console.error("The user was not deleted properly");
            return res.send(err);
        }
        console.info("The user was deleted successfully");
        return res.json({ success: true });
    });
};

// this method fetches the courses associated with the current user
exports.getUserCourses = async function (req, res) {
    Student.findOne({ _id: req.session.userInfo._id }).populate('courses.course').populate('courses.tutor').
        exec(function (err, student) {
            if (err) {
                console.error("Could not retrieve the user's courses");
                return handleError(err);
            }
            console.info("The user's course list has been retrieved successfully");
            return res.json({ success: true, data: student.courses });
        });
};

// this method overwrites existing user todos in our database
exports.updateUserTodos = async function (req, res) {
    const { _id, todos } = req.body;

    todos.forEach(function (todo) {
        if (todo._id == null) { // if todo doesnt have an object id, generate one
            todo._id = new mongoose.Types.ObjectId();
        }
    });

    Student.findByIdAndUpdate(_id, { $set: { "todos": todos } },
        { "new": true, "upsert": true },
        (err) => {
            if (err) {
                console.error("The database did not saved the newest todo list version");
                return res.json({ success: false, error: err });
            }
            console.info("The user's todo list has been updated successfully");

            //update the session
            req.session.userInfo.todos = todos;
            req.session.save(function (err) {
                if (err) {
                    console.error("The session was unable to be saved");
                    return res.json({ success: false, error: err });
                }
                console.info("The session was able to be saved");
                req.session.reload(function (err) {
                    //session reloaded
                    if (err) {
                        console.warn("The session failed to reload");
                    }
                    else {
                        console.info("The session reloaded successfully");
                    }
                    return res.json({ success: true });
                });
            });
        }
    );
};

// Sends a announcement to students
exports.sendAnnouncementStudents = async function (req, res) {
    const { students, announcement } = req.body;

    students.forEach(function (student) {
        Student.findByIdAndUpdate(student,
            {
                "$push": { "notifications": announcement },
                "$inc": { "nbNewNotifications": 1 }
            },
            { "new": true, "upsert": true },
            (err) => {
                if (err) {
                    console.error("Could not send the announcement to students");
                    return res.json({ success: false, error: err });
                }
            }
        );
    });
    console.info("The announcement was sent successfully");
    return res.json({ success: true });
};

// Clear notifications count
exports.clearNewNotificationCount = async function (req, res) {
    const { student } = req.body;

    Student.findOne({ _id: student }).then(student => {
        // Clear our the "new" value on the newest notifications
        for (i = 0; i < student.nbNewNotifications; i++) {
            student.notifications[student.notifications.length - 1 - i].new = false
        }
        // Clear new notification count
        student.nbNewNotifications = 0
        student.save()

        // Update and reload session
        req.session.userInfo.nbNewNotifications = 0;
        req.session.userInfo.notifications = student.notifications;
        req.session.save(function (err) {
            req.session.reload(function (err) {
                console.info("Annnoucements count cleared");
                return res.json({ success: true });
            });
        });
    }).catch(err => {
        console.error("Could not clear new announcements" + err);
        return res.json({ success: false, error: err });
    });


};

// this method deletes one notification from the user's notifications list
exports.deleteNotification = async function (req, res) {
    const { student_id, notif_id } = req.body;

    Student.findOne({ _id: student_id }).then(student => {

        //remove specific notif from notification list
        let newList = student.notifications.filter(notif => !notif._id.equals(notif_id));
        student.notifications = newList;
        student.save();

        //update the session
        req.session.userInfo.notifications = newList;
        req.session.save(function (err) {
            if (err) {
                console.error("The session was unable to be saved");
                return res.json({ success: false, error: err });
            }
            console.info("The session was able to be saved");
            req.session.reload(function (err) {
                // session reloaded
                if (err) {
                    console.warn("The session failed to reload");
                }
                else {
                    console.info("The session reloaded successfully");
                }
                return res.json({ success: true, notifications: newList });
            });
        });
    }).catch(err => {
        console.error("The notification has not been deleted properly: " + err);
    });
};